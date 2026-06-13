export interface CompanyResponseDto {
  id: string;
  email: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: string;
  updatedBy: string | null;
  deletedBy: string | null;
  name: string;
  website: string | null;
  logo: string | null;
  ncc: string;
  location: string | null;
  activity: string;
}

interface Meta {
  total: number;
  page: number;
  lastPage: number;
}

export interface CompanyListResponseDto {
  data: CompanyResponseDto[];
  meta: Meta;
}

export interface CreateCompanyDto {
  name: string;
  email: string;
  contact: string;
  website?: string;
  logo?: string;
  ncc: string;
  location?: string;
  activity: string;
}

export interface UpdateCompanyDto {
  name?: string;
  email?: string;
  contact?: string;
  website?: string;
  logo?: string;
  ncc?: string;
  location?: string;
  activity?: string;
}