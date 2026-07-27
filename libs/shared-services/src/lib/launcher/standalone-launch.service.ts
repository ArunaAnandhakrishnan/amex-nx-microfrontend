import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { AuthApiService } from '../auth/auth-api.service';
import { EnvironmentService } from '../config/environment.service';

/**
 * StandaloneLaunchService
 *
 * Decides how a standalone portal should start when opened directly
 * (e.g. hitting http://localhost:4209 instead of going through Shell).
 *
 * This is orchestration only — it deliberately reuses:
 *  - AuthApiService.validateSession() for the actual session check
 *    (cookie-based, hydrates SessionService + AmexPortalAuthUtil; never
 *    throws, so no extra error handling is needed here).
 *  - EnvironmentService for both destination URLs (LOGIN_APP_URL /
 *    SHELL_APP_URL), so nothing here is hardcoded.
 *
 * It does NOT implement authentication, session, storage, or navigation
 * logic of its own — see auth/, session/, config/ for that.
 */
@Injectable({
  providedIn: 'root',
})
export class StandaloneLaunchService {

  private readonly authApiService = inject(AuthApiService);

  private readonly environmentService = inject(EnvironmentService);

  /**
   * Launches a standalone portal.
   *
   * - If the user has a valid session (validated against the backend,
   *   not just a locally-cached flag), redirects into Shell at the given
   *   route.
   * - Otherwise, redirects to the Shell login page.
   *
   * @param shellRoute Route to land on inside Shell after a valid
   *   session is confirmed, e.g. '/misc/priority-pass', '/statement'.
   *   Leading slash is optional — normalized either way.
   *
   * Example (from a standalone portal's app.config.ts / bootstrap.ts):
   *   launchService.launch('/misc/priority-pass');
   */
  async launch(shellRoute: string): Promise<void> {
    const authenticated = await firstValueFrom(
      this.authApiService.validateSession(),
    );

    const destination = authenticated
      ? `${this.environmentService.getShellAppUrl()}${this.normalizeRoute(shellRoute)}`
      : this.environmentService.getLoginAppUrl();

    window.location.replace(destination);
  }

  /**
   * Ensures the route always has exactly one leading slash, regardless
   * of how the caller passed it in ('/statement' or 'statement').
   */
  private normalizeRoute(shellRoute: string): string {
    return shellRoute.startsWith('/') ? shellRoute : `/${shellRoute}`;
  }
}
