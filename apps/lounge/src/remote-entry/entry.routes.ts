// apps/lounge/src/remote-entry/entry.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';
import { SHELL_HOSTED } from '../app/constants/shell.token';

export const remoteRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../app/pages/priority-pass/lounge-shell-wrapper.component')
        .then(m => m.LoungeShellWrapperComponent),
    providers: [
      { provide: SHELL_HOSTED, useValue: true },
    ],
  },
];
