import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';
import { SHELL_HOSTED } from '../app/constants/shell.token';
import { WearablesEntryComponent } from './entry.component';

/**
 * Routes exposed to the Shell via Module Federation as './Routes'.
 * Replaces WearablesRemoteEntryModule (NgModule + RouterModule.forChild).
 */
export const remoteRoutes: Routes = [
  {
    path: '',
    component: WearablesEntryComponent,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../app/pages/wearables-shell-wrapper/wearables-shell-wrapper.component').then(
            (m) => m.WearablesShellWrapperComponent,
          ),
        providers: [{ provide: SHELL_HOSTED, useValue: true }],
      },
    ],
  },
];
