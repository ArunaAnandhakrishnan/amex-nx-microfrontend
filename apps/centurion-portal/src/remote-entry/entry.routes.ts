import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

import { CentEntryComponent } from './entry.component';
import { CentHomeComponent } from '../app/pages/home/cent-home.component';
import { CentLoadClientComponent } from '../app/pages/load-client/cent-load-client.component';
import { CentPersonalizeComponent } from '../app/pages/personalize/cent-personalize.component';
import { CentConfirmComponent } from '../app/pages/confirm/cent-confirm.component';

export const remoteRoutes: Routes = [
  {
    path: '',
    component: CentEntryComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: CentHomeComponent, canActivate: [authGuard] },
      { path: 'load-client', component: CentLoadClientComponent, canActivate: [authGuard] },
      { path: 'personalize', component: CentPersonalizeComponent, canActivate: [authGuard] },
      { path: 'confirm', component: CentConfirmComponent, canActivate: [authGuard] },
    ],
  },
];
