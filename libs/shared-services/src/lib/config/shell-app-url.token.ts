import { InjectionToken } from '@angular/core';

/**
 * SHELL_APP_URL
 *
 * Base origin of the Shell application — used by StandaloneLaunchService
 * to build the redirect URL when a standalone portal is opened directly
 * and the user already has a valid session (e.g. redirecting
 * `http://localhost:4209` → `http://localhost:4200/misc/priority-pass`).
 *
 * This is intentionally a SEPARATE token from LOGIN_APP_URL, even though
 * for the 12 shell-sub-portals they resolve to the same origin. They are
 * not the same concept:
 *  - LOGIN_APP_URL defaults to the standalone Login-Logout-auth-app
 *    (localhost:4216) for apps that are never shell-hosted (bta-portal,
 *    oms, soc-roc) — those apps have no shell to redirect back into.
 *  - SHELL_APP_URL always means the Shell app's own origin. Deriving it
 *    from LOGIN_APP_URL would silently break for any app still on the
 *    LOGIN_APP_URL default.
 *
 * DEFAULT = localhost:4200 (Shell's dev-serve port). Override only if a
 * specific app's Shell instance genuinely runs elsewhere.
 */
export const SHELL_APP_URL = new InjectionToken<string>('SHELL_APP_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:4200',
});
