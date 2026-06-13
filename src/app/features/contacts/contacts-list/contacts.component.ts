import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompaniesService } from '../../companies/data-access/companies.service';
import { CompanyListResponseDto } from '../../companies/interface/company.interface';
import { ContactsService } from '../data-access/contacts.service';
import { ContactListResponseDto } from '../interfaces/contacts.interface';

@Component({
  selector: 'app-contacts',
  imports: [RouterLink],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsListComponent implements OnInit {
  private contactsService = inject(ContactsService);
  private companiesService = inject(CompaniesService);

  public companiesData: CompanyListResponseDto | null = null;
  public contactData: ContactListResponseDto | null = null;
  public errorMessage: string | null = null;
  public selectedCompanyId: string = '';

  ngOnInit(): void {
    this.findAll();

    this.companiesService.findAll(1, 100).subscribe({
      next: (data) => {
        this.companiesData = data;
      },
      error: (err) => console.log(err),
    });
  }

  findAll() {
    this.contactsService.findAll(1, 10, this.selectedCompanyId || undefined).subscribe({
      next: (data) => {
        this.contactData = data;
      },
      error: () => {
        this.errorMessage = 'Récupération des contacts a échoué';
      },
    });
  }

  onCompanyFilter(value: string) {
    this.selectedCompanyId = value;
    this.findAll();
  }

  onDelete(contactId: string) {
    if (!confirm('Supprimer ce contact ?')) return;

    this.contactsService.remove(contactId).subscribe({
      next: () => {
        this.findAll();
      },
      error: () => {
        this.errorMessage = 'La suppression a échouée';
      },
    });
  }
}
