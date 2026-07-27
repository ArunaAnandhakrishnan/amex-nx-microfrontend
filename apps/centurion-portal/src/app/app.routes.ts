import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'centurion', pathMatch: 'full' },
  {
    path: 'centurion',
    loadChildren: () =>
      import('../remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
  { path: '**', redirectTo: 'centurion' },
];
