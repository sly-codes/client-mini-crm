import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompaniesService } from '../data-access/companies.service';
import { CompanyListResponseDto } from '../interface/company.interface';

@Component({
  selector: 'app-companies-list',
  imports: [RouterLink],
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.scss',
})
export class CompaniesListComponent implements OnInit {
  private companiesService = inject(CompaniesService);

  public companiesData: CompanyListResponseDto | null = null;
  public errorMessage: string | null = null;

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.companiesService.findAll(1, 3).subscribe({
      next: (data) => (this.companiesData = data),
      error: () => {
        this.errorMessage = 'La récupération des entreprises a échoué';
      },
    });
  }

  onDelete(companyId: string) {
    if (!confirm('Supprimer cette entreprise ?')) return;

    this.companiesService.remove(companyId).subscribe({
      next: () => {
        this.findAll();
        console.log('data remove');
      },
      error: () => {
        this.errorMessage = 'La suppression a échoué. Veuillez réessayer.';
      },
    });
  }
}
