import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompaniesService } from '../../companies/data-access/companies.service';
import { CompanyListResponseDto } from '../../companies/interface/company.interface';
import { ContactsService } from '../../contacts/data-access/contacts.service';
import { ContactListResponseDto } from '../../contacts/interfaces/contacts.interface';
import { OpportunitiesService } from '../data-access/opportunities.service';
import {
  CreateOpportunityDto,
  OpportunityStatus,
  UpdateOpportunityDto,
} from '../interfaces/opportunities.interface';

@Component({
  selector: 'app-opportunities-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './opportunities-form.component.html',
  styleUrl: './opportunities-form.component.scss',
})
export class OpportunitiesFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private opportunitiesService = inject(OpportunitiesService);
  private router = inject(Router);
  private contactsService = inject(ContactsService);
  private companiesService = inject(CompaniesService);
  private route = inject(ActivatedRoute);

  public statusOptions = Object.values(OpportunityStatus);
  public companiesData: CompanyListResponseDto | null = null;
  public contactsData: ContactListResponseDto | null = null;
  public opportunityId: string | null = null;

  ngOnInit(): void {
    this.findAllContact();
    this.findAllCompany();

    this.opportunityId = this.route.snapshot.paramMap.get('id');

    if (this.opportunityId) {
      this.opportunitiesService.findOne(this.opportunityId).subscribe({
        next: (data) => {
          this.form.patchValue({
            ...data,
            closeDate: data.closeDate?.split('T')[0] ?? null,
          });
        },
      });
    }
  }

  form = this.fb.group({
    title: ['', [Validators.required]],
    amount: [0, [Validators.required]],
    closeDate: ['', [Validators.required]],
    status: ['', [Validators.required]],
    contactId: ['', [Validators.required]],
    companyId: ['', [Validators.required]],
  });

  findAllContact() {
    this.contactsService.findAll(1, 100).subscribe({
      next: (data) => {
        this.contactsData = data;
      },
      error: (err) => console.log(err),
    });
  }

  findAllCompany() {
    this.companiesService.findAll(1, 100).subscribe({
      next: (data) => {
        this.companiesData = data;
      },
      error: (err) => console.log(err),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value;
    if (this.opportunityId) {
      this.opportunitiesService.update(this.opportunityId, data as UpdateOpportunityDto).subscribe({
        next: () => {
          this.router.navigate(['/opportunities']);
        },
        error: (err) => console.log(err),
      });
    } else {
      this.opportunitiesService.create(data as CreateOpportunityDto).subscribe({
        next: () => {
          this.router.navigate(['/opportunities']);
        },
        error: (err) => console.log(err),
      });
    }
  }
}
