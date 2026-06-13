import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OpportunitiesService } from '../data-access/opportunities.service';
import {
  OpportunityListResponseDto,
  OpportunityStatus,
} from '../interfaces/opportunities.interface';

@Component({
  selector: 'app-opportunities-list',
  imports: [RouterLink, DatePipe, DecimalPipe, CurrencyPipe],
  templateUrl: './opportunities-list.component.html',
  styleUrl: './opportunities-list.component.scss',
})
export class OpportunitiesListComponent implements OnInit {
  private opportunitiesService = inject(OpportunitiesService);

  public opportunitiesData: OpportunityListResponseDto | null = null;
  public errorMessage: string | null = null;
  public selectedStatus: string = '';
  public statusOptions = Object.values(OpportunityStatus);

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    const status = this.selectedStatus as OpportunityStatus | undefined;
    this.opportunitiesService.findAll(1, 10, status || undefined).subscribe({
      next: (data) => {
        this.opportunitiesData = data;
      },
      error: () => {
        this.errorMessage = 'Récupération des opportunités a échoué';
      },
    });
  }

  onStatusFilter(value: string) {
    this.selectedStatus = value;
    this.findAll();
  }

  onDelete(opportunityId: string) {
    if (!confirm('Supprimer cette opportunité ?')) return;
    this.opportunitiesService.remove(opportunityId).subscribe({
      next: () => this.findAll(),
      error: () => {
        this.errorMessage = 'La suppression a échoué';
      },
    });
  }
}
