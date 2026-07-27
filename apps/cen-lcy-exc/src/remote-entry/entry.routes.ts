import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';
import { SHELL_HOSTED } from '../app/constants/shell.token';

import { CenLcyExcEntryComponent } from './entry.component';

export const remoteRoutes: Routes = [
  {
    path: '',
    component: CenLcyExcEntryComponent,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../app/pages/currency-exchange/cen-lcy-exc-shell-wrapper.component')
            .then((m) => m.CenLcyExcShellWrapperComponent),
        providers: [{ provide: SHELL_HOSTED, useValue: true }],
      },
    ],
  },
];
