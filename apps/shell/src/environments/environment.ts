/**
 * Remote-entry URLs for every Module Federation remote the shell loads.
 * Keyed by portal, not by port — routing code should never know or care
 * which port a remote runs on, only where its remoteEntry.js lives.
 */
export interface ShellRemoteUrls {
  shell: string;
  account: string;
  bcrb: string;
  statement: string;
  vatInvoice: string;
  bta: string;
  offers: string;
  supplementary: string;
  wearables: string;
  payWithPoints: string;
  digitalWallet: string;
  priorityPass: string;
  centurion: string;
  cenLcyExc: string;
  changePassword: string;
}

export const environment: {
  production: boolean;
  apiBaseUrl: string;
  loginAppUrl: string;
  remotes: ShellRemoteUrls;
} = {
  production: false,
  apiBaseUrl: 'http://localhost:8080',
  loginAppUrl: 'http://localhost:4200/login',
  remotes: {
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
    // digital-wallet currently resolves through the same remoteEntry as
    // pay-with-points (port 4207) — preserved exactly as in the original
    // hardcoded routes.ts, not changed as part of this refactor.
    digitalWallet: 'http://localhost:4207/remoteEntry.js',
    priorityPass: 'http://localhost:4209/remoteEntry.js', // lounge portal
    centurion: 'http://localhost:4211/remoteEntry.js',
    cenLcyExc: 'http://localhost:4210/remoteEntry.js',
    changePassword: 'http://localhost:4214/remoteEntry.js',
  },
};
