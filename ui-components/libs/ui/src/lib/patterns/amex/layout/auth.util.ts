import { inject, signal, Signal, DestroyRef } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export const AMEX_USER_KEY = 'mfe_user';

export class AmexPortalAuthUtil {
  readonly authenticated = signal(this._checkAuth());

  getUser(): { userId?: string; username: string; roles: string[] } | null {
    const raw = localStorage.getItem(AMEX_USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  getUsername(): string {
    return this.getUser()?.username ?? '';
  }
  isAuthenticated(): boolean {
    const result = this._checkAuth();
    this.authenticated.set(result);
    return result;
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    if (!user) return false;
    const normalised = role.startsWith('ROLE_') ? role : `ROLE_${role}`;
    return user.roles?.includes(normalised) || user.roles?.includes(role);
  }
  onLoginSuccess(userPayload: {
    userId?: string;
    username: string;
    roles: string[];
  }): void {
    localStorage.setItem(AMEX_USER_KEY, JSON.stringify(userPayload));
    this.authenticated.set(true);
  }

  logout(): void {
    localStorage.removeItem(AMEX_USER_KEY);
    this.authenticated.set(false);
  }
  listenToStorageEvents(destroyRef?: DestroyRef): void {
    const handler = (e: StorageEvent) => {
      if (e.key === AMEX_USER_KEY) {
        this.authenticated.set(this._checkAuth());
      }
    };
    window.addEventListener('storage', handler);
    destroyRef?.onDestroy(() => window.removeEventListener('storage', handler));
  }

  private _checkAuth(): boolean {
    return !!this.getUser();
  }
}

export function isPortalAuthenticated(): Signal<boolean> {
  const util = new AmexPortalAuthUtil();
  return util.authenticated;
}

export const portalAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const util = new AmexPortalAuthUtil();
  if (util.isAuthenticated()) return true;
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};

export const portalRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const util = new AmexPortalAuthUtil();
  const requiredRoles = (route.data?.['roles'] ?? []) as string[];
  if (!util.isAuthenticated()) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }
  if (!requiredRoles.length) return true;
  if (requiredRoles.some((r) => util.hasRole(r))) return true;
  return router.createUrlTree(['/access-denied']);
};

export function checkServiceHealth(
  http: HttpClient,
  url: string,
): Observable<{ status: 'UP' | 'DOWN'; responseMs: number }> {
  if (!url) {
    return of({ status: 'DOWN' as const, responseMs: 0 });
  }
  const start = Date.now();
  return http.get<{ status: string }>(url).pipe(
    map((res) => ({
      status: (res?.status === 'UP' ? 'UP' : 'DOWN') as 'UP' | 'DOWN',
      responseMs: Date.now() - start,
    })),
    catchError(() =>
      of({ status: 'DOWN' as const, responseMs: Date.now() - start }),
    ),
  );
}
