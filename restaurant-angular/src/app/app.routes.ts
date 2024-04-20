import { Routes } from '@angular/router';
import { SignupComponent } from './auth-components/signup/signup.component';
import { LoginComponent } from './auth-components/login/login.component';

export const routes: Routes = [
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent},
  { path: 'admin', loadChildren: () => import('./admin/routes').then(mod => mod.ADMIN_ROUTES) },
  { path: 'customer', loadChildren: () => import('./customer/routes').then(mod => mod.CUSTOMER_ROUTES)}
];
