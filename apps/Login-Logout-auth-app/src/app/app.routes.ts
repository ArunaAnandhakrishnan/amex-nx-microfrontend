import { Routes } from '@angular/router';
import { portalAuthGuard } from '@ui-components/ui';
import { LoginPageComponent } from './login-page.component';
import { HomePageComponent } from './home-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page.component';
import { RegisterPageComponent } from './register-page.component';
import { ForgotUserIdPageComponent } from './forgot-user-id-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'forgot-password', component: ForgotPasswordPageComponent },
  { path: 'forgot-user-id', component: ForgotUserIdPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [portalAuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];