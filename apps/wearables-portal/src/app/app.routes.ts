import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/wearables-shell-wrapper/wearables-shell-wrapper.component')
        .then(m => m.WearablesShellWrapperComponent),
  },
  { path: '**', redirectTo: '' },
];