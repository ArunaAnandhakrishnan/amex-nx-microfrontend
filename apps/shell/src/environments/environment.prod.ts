import { ShellRemoteUrls } from './environment';

export const environment: {
  production: boolean;
  apiBaseUrl: string;
  loginAppUrl: string;
  remotes: ShellRemoteUrls;
} = {
  production: true,
  // TODO: replace with actual UAT/Prod API Gateway URL
  apiBaseUrl: 'http://localhost:8080',
  // TODO: replace with actual UAT/Prod shell login page URL
  loginAppUrl: 'http://localhost:4200/login',
  remotes: {
    // TODO: replace each with its actual UAT/Prod remoteEntry.js URL
    shell: '',
    account: 'http://localhost:4202/remoteEntry.js',
    bcrb: 'http://localhost:4208/remoteEntry.js',
    statement: 'http://localhost:4212/remoteEntry.js',
    vatInvoice: 'http://localhost:4213/remoteEntry.js',
    bta: 'http://localhost:4203/remoteEntry.js',
    offers: 'http://localhost:4204/remoteEntry.js',
    supplementary: 'http://localhost:4205/remoteEntry.js',
    wearables: 'http://localhost:4206/remoteEntry.js',
    payWithPoints: 'http://localhost:4207/remoteEntry.js',
    digitalWallet: 'http://localhost:4207/remoteEntry.js',
    priorityPass: 'http://localhost:4209/remoteEntry.js',
    centurion: 'http://localhost:4211/remoteEntry.js',
    cenLcyExc: 'http://localhost:4210/remoteEntry.js',
    changePassword: 'http://localhost:4214/remoteEntry.js',
  },
};
