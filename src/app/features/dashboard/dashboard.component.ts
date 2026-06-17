import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from './data-access/dashboard.service';
import { DashboardStats } from './interfaces/dashboard.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  public statsData: DashboardStats | null = null;
  public errorMessage: string | null = null;

  ngOnInit(): void {
    this.getStats()
  }

  getStats(): void {
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.statsData = data;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erreur lors du chargement du tableau de bord';
      },
    });
  }
}
