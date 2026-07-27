import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/priority-pass/lounge-priority-pass.component')
        .then(m => m.LoungePriorityPassComponent),
  },
];