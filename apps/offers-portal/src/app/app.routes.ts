import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'offers', pathMatch: 'full' },
  {
    path: 'offers',
    loadChildren: () =>
      import('../remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
  { path: '**', redirectTo: 'offers' },
];
