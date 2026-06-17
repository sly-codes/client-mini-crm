export interface CreateTaskDto {
  title: string;
  description?: string;
  status: TaskStatus;
  contactId?: string;
  opportunityId?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  contactId?: string;
  opportunityId?: string;
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
}

interface Opportunity {
  id: string;
  title: string;
}

export interface TaskResponseDto {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: string;
  updatedBy: string | null;
  deletedBy: string | null;
  contactId: string | null;
  opportunityId: string | null;
  contact: Contact | null;
  opportunity: Opportunity | null;
}

interface Meta {
  total: number;
  page: number;
  lastPage: number;
}
export interface TaskListResponseDto {
  data: TaskResponseDto[];
  meta: Meta;
}
