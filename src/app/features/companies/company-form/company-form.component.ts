import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompaniesService } from '../data-access/companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../interface/company.interface';

@Component({
  selector: 'app-company-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private companiesService = inject(CompaniesService);
  private route = inject(ActivatedRoute);

  public companyId: string | null = null;
  public errorMessage: string | null = null;

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');

    if (this.companyId) {
      this.companiesService.findOne(this.companyId).subscribe({
        next: (data) => {
          this.form.patchValue(data);
        },
        error: () => {
          this.errorMessage = "Impossible de charger l'entreprise. Vérifiez votre connexion.";
        },
      });
    }
  }

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    contact: ['', [Validators.required]],
    ncc: ['', [Validators.required]],
    website: [''],
    logo: [''],
    location: [''],
    activity: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.companyId) {
      this.companiesService.update(this.companyId, data as UpdateCompanyDto).subscribe({
        next: () => {
          this.router.navigate(['/companies']);
        },
        error: () => {
          this.errorMessage = "La mise à jour a échoué. Vérifiez les données saisies.";
        },
      });
    } else {
      this.companiesService.create(data as CreateCompanyDto).subscribe({
        next: () => {
          this.router.navigate(['/companies']);
        },
        error: () => {
          this.errorMessage = "La création a échoué. Cet email ou ce NCC est peut-être déjà utilisé.";
        },
      });
    }
  }
}
