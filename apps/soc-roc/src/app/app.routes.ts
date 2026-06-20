import { Routes } from '@angular/router';
import { FileFormationUpload } from './pages/utilities/file-formation-upload/file-formation-upload';

import { CountryMaster } from './pages/masters/country-master/country-master.component';
import { CurrencyMaster } from './pages/masters/currency-master/currency-master.component';

import { MerchantData } from './pages/merchant-data/merchant-data';

import { SocRocTransactions } from './pages/soc-roc-transactions/soc-roc-transactions';

import { Dashboard } from './pages/dashboard/dashboard.component';

import { ExtractRejectedItems } from './pages/utilities/extract-rejected-items/extract-rejected-items';
import { RetrievalOldRecords } from './pages/utilities/retrieval-old-records/retrieval-old-records';
import { DownloadSocRocExcel } from './pages/utilities/download-soc-roc-excel/download-soc-roc-excel';
import { DownloadMultipleSe } from './pages/utilities/download-multiple-se/download-multiple-se';
import { CaptureMultipleSe } from './pages/utilities/capture-multiple-se/capture-multiple-se';

import { DetailsByCurrency } from './pages/reports/details-by-currency/details-by-currency';
import { SocControlReport } from './pages/reports/soc-control-report/soc-control-report';
import { RejectionLetter } from './pages/reports/rejection-letter/rejection-letter';
import { RejectionLetterDetails } from './pages/reports/rejection-letter-details/rejection-letter-details';
import { ConsolidatedRejectionReport } from './pages/reports/consolidated-rejection-report/consolidated-rejection-report';

import { Retrieval } from './pages/retrieval/retrieval';

import { AlgeriaPayment } from './pages/algeria-payment/algeria-payment';

import { PaymentRegister } from './pages/payment-register/payment-register';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },

    { path: 'masters/country-master', component: CountryMaster },
    { path: 'masters/currency-master', component: CurrencyMaster },

    { path: 'merchant-data/merchant-data', component: MerchantData},

    { path: 'soc-roc-transactions/soc-roc-transactions', component: SocRocTransactions},

    { path: 'reports/details-by-currency', component: DetailsByCurrency },
    { path: 'reports/soc-control-report', component: SocControlReport },
    { path: 'reports/rejection-letter', component: RejectionLetter },
    { path: 'reports/rejection-letter-details', component: RejectionLetterDetails },
    { path: 'reports/consolidated-rejection-report', component: ConsolidatedRejectionReport },

    { path: 'utilities/file-formation-upload', component: FileFormationUpload },
    { path: 'utilities/extract-rejected-items', component: ExtractRejectedItems },
    { path: 'utilities/retrieval-old-records', component: RetrievalOldRecords },
    { path: 'utilities/download-soc-roc-excel', component: DownloadSocRocExcel },
    { path: 'utilities/download-multiple-se', component: DownloadMultipleSe },
    { path: 'utilities/capture-multiple-se', component: CaptureMultipleSe },

    { path: 'retrieval', component: Retrieval },

    { path: 'algeria-payment', component: AlgeriaPayment },

    { path: 'payment-register', component: PaymentRegister },
];