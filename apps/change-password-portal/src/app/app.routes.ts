// apps/change-password-portal/src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
];