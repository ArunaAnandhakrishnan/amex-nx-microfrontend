import { Route } from '@angular/router';
import { authGuard } from '@amex/shared-services';
import { EntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  { path: '', component: EntryComponent, canActivate: [authGuard] },
];
