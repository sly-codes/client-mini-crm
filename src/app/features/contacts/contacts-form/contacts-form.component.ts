import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompaniesService } from '../../companies/data-access/companies.service';
import { CompanyListResponseDto } from '../../companies/interface/company.interface';
import { ContactsService } from '../data-access/contacts.service';
import { CreateContactDto, UpdateContactDto } from '../interfaces/contacts.interface';

@Component({
  selector: 'app-contacts-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contacts-form.component.html',
  styleUrl: './contacts-form.component.scss',
})
export class ContactsFormComponent implements OnInit {
  private companiesService = inject(CompaniesService);
  private contactService = inject(ContactsService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public companiesData: CompanyListResponseDto | null = null;
  public contactId: string | null = null;
  public errorMessage: string | null = null;

  ngOnInit(): void {
    this.findAll();

    this.contactId = this.route.snapshot.paramMap.get('id');

    if (this.contactId) {
      this.contactService.findOne(this.contactId).subscribe({
        next: (data) => {
          this.form.patchValue(data);
        },
        error: (err) => console.log(err),
      });
    }
  }

  findAll() {
    this.companiesService.findAll(1, 100).subscribe({
      next: (data) => {
        this.companiesData = data;
      },
      error: (err) => console.log(err),
    });
  }

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    contact: ['', [Validators.required]],
    position: [''],
    companyId: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.contactId) {
      this.contactService.update(data as UpdateContactDto, this.contactId).subscribe({
        next: () => this.router.navigate(['/contacts']),
        error: () => this.errorMessage = 'La mise à jour a échoué. Vérifiez les données saisies.',
      });
    } else {
      this.contactService.create(data as CreateContactDto).subscribe({
        next: () => this.router.navigate(['/contacts']),
        error: () => this.errorMessage = 'La création a échoué. Cet email est peut-être déjà utilisé.',
      });
    }
  }
}
