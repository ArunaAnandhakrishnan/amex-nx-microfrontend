import { inject, Injectable } from '@angular/core';

import { API_BASE_URL } from './api-base-url.token';
import { LOGIN_APP_URL } from './login-app-url.token';
import { SHELL_APP_URL } from './shell-app-url.token';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {

  /**
   * Login application URL — resolved from LOGIN_APP_URL token.
   * Defaults to the standalone Login-Logout-auth-app (4216); shell
   * and the 12 shell-sub-portals override this to shell's own /login
   * (4200) in their own app.config.ts / app.module.ts providers.
   */
  private readonly loginAppUrl = inject(LOGIN_APP_URL);

  private readonly apiBaseUrl = inject(API_BASE_URL);

  /**
   * Shell application origin — resolved from SHELL_APP_URL token.
   * See shell-app-url.token.ts for why this is separate from
   * LOGIN_APP_URL rather than derived from it.
   */
  private readonly shellAppUrl = inject(SHELL_APP_URL);

  /**
   * Returns API Gateway base URL.
   */
  getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }

  /**
   * Returns Login application URL.
   */
  getLoginAppUrl(): string {
    return this.loginAppUrl;
  }

  /**
   * Returns Shell application origin (no trailing slash).
   */
  getShellAppUrl(): string {
    return this.shellAppUrl;
  }

}