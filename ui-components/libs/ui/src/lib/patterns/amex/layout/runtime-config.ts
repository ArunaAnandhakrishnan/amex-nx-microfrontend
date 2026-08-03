import { Injectable, inject, APP_INITIALIZER, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AmexPortalRuntimeConfigService {
  private readonly http = inject(HttpClient);

  private store: Record<string, unknown> = {};

  load(url: string): Observable<void> {
    return this.http.get<Record<string, unknown>>(url).pipe(
      tap((cfg) => {
        this.store = cfg ?? {};
      }),
      catchError((err) => {
        console.warn(
          `[AmexPortalRuntime] Config load failed (${url}):`,
          err?.message ?? 'unknown error',
        );
        return of({} as Record<string, unknown>);
      }),
      map(() => undefined),
    );
  }
  get<T>(key: string): T | undefined {
    return this.store[key] as T | undefined;
  }

  getAll(): Record<string, unknown> {
    return { ...this.store };
  }
}
export function providePortalRuntimeConfig(
  url = '/assets/config/portal-config.json',
): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: (cfg: AmexPortalRuntimeConfigService) => () => cfg.load(url),
    deps: [AmexPortalRuntimeConfigService],
    multi: true,
  };
}
