import { Routes } from '@angular/router';
import { App } from './app';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { CompaniesListComponent } from './features/companies/companies-list/companies-list.component';
import { CompanyFormComponent } from './features/companies/company-form/company-form.component';
import { ContactsFormComponent } from './features/contacts/contacts-form/contacts-form.component';
import { ContactsListComponent } from './features/contacts/contacts-list/contacts.component';
import { OpportunitiesFormComponent } from './features/opportunities/opportunities-form/opportunities-form.component';
import { OpportunitiesListComponent } from './features/opportunities/opportunities-list/opportunities-list.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: App,
    canActivate: [authGuard],
  },
  {
    path: 'companies',
    component: CompaniesListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'companies/new',
    component: CompanyFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'companies/:id/edit',
    component: CompanyFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'contacts',
    component: ContactsListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'contacts/new',
    component: ContactsFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'contacts/:id/edit',
    component: ContactsFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'opportunities',
    component: OpportunitiesListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'opportunities/new',
    component: OpportunitiesFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'opportunities/:id/edit',
    component: OpportunitiesFormComponent,
    canActivate: [authGuard],
  },
];
