import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

import { ChangePasswordEntryComponent } from './entry.component';

export const remoteRoutes: Routes = [
  {
    path: '',
    component: ChangePasswordEntryComponent,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../app/pages/change-password/change-password.component')
            .then((m) => m.ChangePasswordComponent),
      },
    ],
  },
];
