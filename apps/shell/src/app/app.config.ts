import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { errorInterceptor } from './services/error.interceptor';
import { environment } from '../environments/environment';

import { AmexPortalAuthUtil } from '@ui-components/ui';
import {
  authTokenInterceptor,
  loadingInterceptor,
  retryInterceptor,
  API_BASE_URL,
  LOGIN_APP_URL,
  AuthApiService,
} from '@amex/shared-services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        authTokenInterceptor,
        errorInterceptor,
        loadingInterceptor,
        retryInterceptor,
      ]),
    ),

    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },

    // Shell hosts the single login page for the whole portal suite —
    // every shared authGuard/roleGuard redirect (shell's own routes
    // AND any of the 12 sub-portals hit standalone on their own port)
    // lands here. Standalone-only apps (bta-portal, oms, soc-roc)
    // don't override this, so they keep going to the default
    // Login-Logout-auth-app (localhost:4216) untouched.
    { provide: LOGIN_APP_URL, useValue: environment.loginAppUrl },

    // Workaround: AmexPortalAuthUtil (in @ui-components/ui) lacks its own
    // @Injectable decorator in the published package. authGuard/roleGuard
    // (and AuthApiService, which extends it) inject it directly, so provide
    // it explicitly here until the ui-components package is rebuilt/
    // republished with the decorator added.
    { provide: AmexPortalAuthUtil, useClass: AmexPortalAuthUtil },

    // Runs once, before the router's first navigation. Hydrates
    // SessionService / AmexPortalAuthUtil from the HTTP-only cookie
    // (via /api/auth/session) so guards see the correct logged-in
    // state on refresh.
    // NOTE: this replaces the old APP_INITIALIZER + useFactory pattern
    // with the Angular 19+ functional provideAppInitializer() — same
    // behaviour, runs at the same point in the bootstrap lifecycle.
    provideAppInitializer(() => {
      const authApi = inject(AuthApiService);
      return firstValueFrom(authApi.validateSession());
    }),
  ],
};
