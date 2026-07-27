import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

import { PayWithPointsEntryComponent } from './entry.component';

export const remoteRoutes: Routes = [
  {
    path: '',
    component: PayWithPointsEntryComponent,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../app/pages/pay-with-points/pay-with-points.component')
            .then((m) => m.PayWithPointsComponent),
      },
    ],
  },
];
