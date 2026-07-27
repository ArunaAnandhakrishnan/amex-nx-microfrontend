import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'supp', pathMatch: 'full' },
  {
    path: 'supp',
    loadChildren: () =>
      import('../remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
  { path: '**', redirectTo: 'supp' },
];
