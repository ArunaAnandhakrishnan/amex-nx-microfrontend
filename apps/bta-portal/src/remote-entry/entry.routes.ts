import { Routes } from '@angular/router';
import { roleGuard } from '@amex/shared-services';
import {
  CORP_ROLES,
  TA_ROLES,
  TA_ADMIN_ROLES,
  AEME_ADMIN_ROLES,
  ALL_ADMINS,
} from '../app/constants/roles.constants';

import { BtaEntryComponent } from './entry.component';

export const remoteRoutes: Routes = [
  {
    path: '',
    component: BtaEntryComponent,
    children: [
      {
        path: 'user-management',
        canActivate: [roleGuard(ALL_ADMINS)],
        loadComponent: () =>
          import('../app/pages/user-management/bta-user-management.component')
            .then((m) => m.BtaUserManagementComponent),
      },
      {
        path: 'memo-statement',
        canActivate: [roleGuard([...CORP_ROLES, ...AEME_ADMIN_ROLES])],
        loadComponent: () =>
          import('../app/pages/memo-statement/bta-memo-statement.component')
            .then((m) => m.BtaMemoStatementComponent),
      },
      {
        path: 'large-reports',
        canActivate: [roleGuard(CORP_ROLES)],
        loadComponent: () =>
          import('../app/pages/large-reports/bta-large-reports.component')
            .then((m) => m.BtaLargeReportsComponent),
      },
      {
        path: 'monthly-statement',
        canActivate: [roleGuard([...CORP_ROLES, ...AEME_ADMIN_ROLES])],
        loadComponent: () =>
          import('../app/pages/monthly-statement/bta-monthly-statement.component')
            .then((m) => m.BtaMonthlyStatementComponent),
      },
      {
        path: 'payment-allocation',
        canActivate: [roleGuard(CORP_ROLES)],
        loadComponent: () =>
          import('../app/pages/payment-allocation/bta-payment-allocation.component')
            .then((m) => m.BtaPaymentAllocationComponent),
      },
      {
        path: 'audit-trail',
        canActivate: [roleGuard([...CORP_ROLES, ...TA_ADMIN_ROLES, ...AEME_ADMIN_ROLES])],
        loadComponent: () =>
          import('../app/pages/audit-trail/bta-audit-trail.component')
            .then((m) => m.BtaAuditTrailComponent),
      },
      {
        path: 'case-management',
        canActivate: [roleGuard(TA_ROLES)],
        loadComponent: () =>
          import('../app/pages/case-management/bta-case-management.component')
            .then((m) => m.BtaCaseManagementComponent),
      },
      {
        path: 'tmc-transactions',
        canActivate: [roleGuard(TA_ROLES)],
        loadComponent: () =>
          import('../app/pages/tmc-transactions/bta-tmc-transactions.component')
            .then((m) => m.BtaTmcTransactionsComponent),
      },

      // NOTE: dashboard, reports, settings, travel intentionally NOT routed
      // here — preserved per explicit instruction (business pages kept even
      // while unwired). Their components are untouched in ../app/pages/.
      // To wire one in later, add an entry here following the same
      // loadComponent + roleGuard pattern as above.

      // NOTE: this used to be a hardcoded `redirectTo: 'user-management'`,
      // which locked out ROLE_CORP_USER / ROLE_TA_USER (they'd get bounced
      // by roleGuard on an admin-only page — looked like login had failed).
      // This now routes each role to their own first accessible page.
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('../app/pages/landing/bta-landing-redirect.component')
            .then((m) => m.BtaLandingRedirectComponent),
      },
    ],
  },
];
