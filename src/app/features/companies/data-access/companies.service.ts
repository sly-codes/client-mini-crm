import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CompanyListResponseDto,
  CompanyResponseDto,
  CreateCompanyDto,
  UpdateCompanyDto,
} from '../interface/company.interface';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private apiUrl = 'http://localhost:3000/api/companies';
  private http = inject(HttpClient);

  findAll(page: number, limit: number): Observable<CompanyListResponseDto> {
    return this.http.get<CompanyListResponseDto>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  create(data: CreateCompanyDto): Observable<CompanyResponseDto> {
    return this.http.post<CompanyResponseDto>(`${this.apiUrl}`, data);
  }

  findOne(companyId: string): Observable<CompanyResponseDto> {
    return this.http.get<CompanyResponseDto>(`${this.apiUrl}/${companyId}`);
  }

  update(companyId: string, data: UpdateCompanyDto): Observable<CompanyResponseDto> {
    return this.http.patch<CompanyResponseDto>(`${this.apiUrl}/${companyId}`, data);
  }

  remove(companyId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${companyId}`);
  }
}
