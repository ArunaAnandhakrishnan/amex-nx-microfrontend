import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/currency-exchange/cen-lcy-exc-shell-wrapper.component')
        .then((m) => m.CenLcyExcShellWrapperComponent),
  },
  { path: '**', redirectTo: '' },
];
