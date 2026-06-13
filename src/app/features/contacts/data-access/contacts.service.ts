import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ContactListResponseDto,
  ContactResponseDto,
  CreateContactDto,
  UpdateContactDto,
} from '../interfaces/contacts.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private apiUrl = 'http://localhost:3000/api/contacts';
  private http = inject(HttpClient);

  create(data: CreateContactDto): Observable<ContactResponseDto> {
    return this.http.post<ContactResponseDto>(`${this.apiUrl}`, data);
  }

  findAll(page: number, limit: number, companyId?: string): Observable<ContactListResponseDto> {
    let url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    if (companyId) url += `&companyId=${companyId}`;

    return this.http.get<ContactListResponseDto>(url);
  }

  findOne(companyId: string): Observable<ContactResponseDto> {
    return this.http.get<ContactResponseDto>(`${this.apiUrl}/${companyId}`);
  }

  update(data: UpdateContactDto, contactId: string): Observable<ContactResponseDto> {
    return this.http.patch<ContactResponseDto>(`${this.apiUrl}/${contactId}`, data);
  }

  remove(contactId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${contactId}`);
  }
}
