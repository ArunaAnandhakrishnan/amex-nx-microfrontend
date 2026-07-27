import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'bta', pathMatch: 'full' },
  {
    path: 'bta',
    loadChildren: () =>
      import('../remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
  { path: '**', redirectTo: 'bta' },
];
