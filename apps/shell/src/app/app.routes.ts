import { Route, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { authGuard } from '@amex/shared-services';

import { environment } from '../environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PortalErrorComponent } from './pages/portal-error/portal-error.component';

// Standalone replacement for the old portal-error.module.ts — the fallback
// route now resolves directly to a component instead of an NgModule.
const portalFallback = (): Route[] => [
  { path: '', component: PortalErrorComponent },
];

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: 'misc/priority-pass', pathMatch: 'full' },

  {
    path: 'account',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.account,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'bcrb',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.bcrb,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'statement',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.statement,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'vat-invoice',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.vatInvoice,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'bta',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.bta,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'offers',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.offers,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'supp',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.supplementary,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'wearables',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.wearables,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'pay-with-points',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.payWithPoints,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'misc/priority-pass',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.priorityPass,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'misc/digital-wallet',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.digitalWallet,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'misc/wearables',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.wearables,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'centurion/centurion-2.0',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.centurion,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'centurion/cen-lcy-exc',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.cenLcyExc,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'change-password',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.changePassword,
        exposedModule: './Routes',
      })
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },
];
