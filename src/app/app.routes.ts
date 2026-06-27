import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { CompaniesListComponent } from './features/companies/companies-list/companies-list.component';
import { CompanyFormComponent } from './features/companies/company-form/company-form.component';
import { ContactsFormComponent } from './features/contacts/contacts-form/contacts-form.component';
import { ContactsListComponent } from './features/contacts/contacts-list/contacts.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { OpportunitiesFormComponent } from './features/opportunities/opportunities-form/opportunities-form.component';
import { OpportunitiesListComponent } from './features/opportunities/opportunities-list/opportunities-list.component';
import { TasksFormComponent } from './features/tasks/tasks-form/tasks-form.component';
import { TasksListComponent } from './features/tasks/tasks-list/tasks-list.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'companies',
        component: CompaniesListComponent,
      },
      {
        path: 'companies/new',
        component: CompanyFormComponent,
      },
      {
        path: 'companies/:id/edit',
        component: CompanyFormComponent,
      },
      {
        path: 'contacts',
        component: ContactsListComponent,
      },
      {
        path: 'contacts/new',
        component: ContactsFormComponent,
      },
      {
        path: 'contacts/:id/edit',
        component: ContactsFormComponent,
      },
      {
        path: 'opportunities',
        component: OpportunitiesListComponent,
      },
      {
        path: 'opportunities/new',
        component: OpportunitiesFormComponent,
      },
      {
        path: 'opportunities/:id/edit',
        component: OpportunitiesFormComponent,
      },
      {
        path: 'tasks',
        component: TasksListComponent,
      },
      {
        path: 'tasks/new',
        component: TasksFormComponent,
      },
      {
        path: 'tasks/:id/edit',
        component: TasksFormComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
];
