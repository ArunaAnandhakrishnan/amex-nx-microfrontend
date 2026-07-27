import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// LEGACY — disabled, see app/utils/token-bridge.util.ts for why.
// import { captureAuthTokenFromUrl } from './app/utils/token-bridge.util';
// captureAuthTokenFromUrl();

bootstrapApplication(AppComponent, appConfig).catch((err: unknown) =>
  console.error(err),
);
