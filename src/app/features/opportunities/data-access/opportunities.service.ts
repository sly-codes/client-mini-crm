import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateOpportunityDto,
  OpportunityListResponseDto,
  OpportunityResponseDto,
  OpportunityStatus,
  UpdateOpportunityDto,
} from '../interfaces/opportunities.interface';

@Injectable({
  providedIn: 'root',
})
export class OpportunitiesService {
  private apiUrl = 'http://localhost:3000/api/opportunities';
  private http = inject(HttpClient);

  create(data: CreateOpportunityDto): Observable<OpportunityResponseDto> {
    return this.http.post<OpportunityResponseDto>(`${this.apiUrl}`, data);
  }

  findAll(
    page: number,
    limit: number,
    status?: OpportunityStatus,
  ): Observable<OpportunityListResponseDto> {
    let url = `${this.apiUrl}?page=${page}&limit=${limit}`;

    if (status) url += `&status=${status}`;

    return this.http.get<OpportunityListResponseDto>(url);
  }

  findOne(opportunityId: string): Observable<OpportunityResponseDto> {
    return this.http.get<OpportunityResponseDto>(`${this.apiUrl}/${opportunityId}`);
  }

  update(opportunityId: string, data: UpdateOpportunityDto): Observable<OpportunityResponseDto> {
    return this.http.patch<OpportunityResponseDto>(`${this.apiUrl}/${opportunityId}`, data);
  }

  remove(opportunityId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${opportunityId}`);
  }
}
