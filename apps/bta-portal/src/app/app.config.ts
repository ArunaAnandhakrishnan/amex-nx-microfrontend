import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

import { AmexPortalAuthUtil } from '@ui-components/ui';
import {
  authTokenInterceptor,
  errorInterceptor,
  loadingInterceptor,
  retryInterceptor,
  API_BASE_URL,
  AuthApiService,
} from '@amex/shared-services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },

    provideHttpClient(
      withInterceptors([
        authTokenInterceptor,
        errorInterceptor,
        loadingInterceptor,
        retryInterceptor,
      ]),
    ),

    // Workaround: AmexPortalAuthUtil (in @ui-components/ui) lacks its own
    // @Injectable decorator in the published package. roleGuard injects it
    // directly, so provide it explicitly here until the ui-components
    // package is rebuilt/republished with the decorator added.
    { provide: AmexPortalAuthUtil, useClass: AmexPortalAuthUtil },

    // Runs once, before the router's first navigation. Hydrates
    // SessionService / AmexPortalAuthUtil from the HTTP-only cookie
    // (via /api/auth/session) so guards see the correct logged-in state
    // even after a cross-origin redirect back from Login-Logout-auth-app.
    provideAppInitializer(() => {
      const authApi = inject(AuthApiService);
      return firstValueFrom(authApi.validateSession());
    }),
  ],
};
