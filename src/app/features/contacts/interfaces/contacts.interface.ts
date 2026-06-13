export interface CreateContactDto {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  position?: string;
  companyId: string;
}

export interface UpdateContactDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  contact?: string;
  position?: string;
  companyId?: string;
}

export interface ContactResponseDto {
  id: string;
  email: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: string;
  updatedBy: string | null;
  deletedBy: string | null;
  firstName: string;
  lastName: string;
  position: string | null;
  companyId: string;
  company: Company;
}

interface Company {
  id: string;
  name: string;
}

interface Meta {
  total: number;
  page: number;
  lastPage: number;
}

export interface ContactListResponseDto {
  data: ContactResponseDto[];
  meta: Meta;
}
