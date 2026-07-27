import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

import { OffersEntryComponent } from './entry.component';

export const remoteRoutes: Routes = [
  {
    path: '',
    component: OffersEntryComponent,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../app/pages/offers/offers-catalogue.component').then(
            (m) => m.OffersCatalogueComponent,
          ),
      },
      {
        path: 'benefits',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../app/pages/benefits/offers-benefits.component').then(
            (m) => m.OffersBenefitsComponent,
          ),
      },
    ],
  },
];
