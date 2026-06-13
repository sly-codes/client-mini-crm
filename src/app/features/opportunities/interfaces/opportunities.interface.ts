export interface CreateOpportunityDto {
  title: string;
  amount: number;
  closeDate: string;
  status: OpportunityStatus;
  contactId: string;
  companyId: string;
}

export interface UpdateOpportunityDto {
  title?: string;
  amount?: number;
  closeDate?: string;
  status?: OpportunityStatus;
  contactId?: string;
  companyId?: string;
}

interface Company {
  id: string;
  name: string;
}

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
}

export interface OpportunityResponseDto {
  title: string;
  amount: number;
  closeDate: string;
  status: OpportunityStatus;
  contactId: string;
  companyId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: string;
  updatedBy: string | null;
  deletedBy: string | null;
  company: Company;
  contact: Contact;
}

interface Meta {
  total: number;
  page: number;
  lastPage: number;
}

export interface OpportunityListResponseDto {
  data: OpportunityResponseDto[];
  meta: Meta;
}

export enum OpportunityStatus {
  PROSPECT = 'PROSPECT',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL = 'PROPOSAL',
  WON = 'WON',
  LOST = 'LOST',
}
