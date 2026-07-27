import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

import { SuppEntryComponent } from './entry.component';
import { SuppSearchComponent } from '../app/pages/search/supp-search.component';

export const remoteRoutes: Routes = [
  {
    path: '',
    component: SuppEntryComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: SuppSearchComponent, canActivate: [authGuard] },
    ],
  },
];
