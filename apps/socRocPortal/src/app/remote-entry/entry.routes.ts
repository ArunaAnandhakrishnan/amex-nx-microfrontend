// apps/socRocPortal/src/app/remote-entry/entry.routes.ts
import { Routes } from '@angular/router';
import { Dashboard } from '../pages/soc-roc/dashboard/dashboard.component';
import { CountryMaster } from '../pages/soc-roc/masters/country-master/country-master.component';
import { CurrencyMaster } from '../pages/soc-roc/masters/currency-master/currency-master.component';
import { FileFormationUpload } from '../pages/soc-roc/utilities/file-formation-upload/file-formation-upload';
import { ExtractRejectedItems } from '../pages/soc-roc/utilities/extract-rejected-items/extract-rejected-items';

export const remoteRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'masters/country-master',
    component: CountryMaster,
  },
  {
    path: 'masters/currency-master',
    component: CurrencyMaster,
  },
  {
    path: 'utilities/file-formation-upload',
    component: FileFormationUpload,
  },
  {
    path: 'utilities/extract-rejected-items',
    component: ExtractRejectedItems,
  },
];

export default remoteRoutes;