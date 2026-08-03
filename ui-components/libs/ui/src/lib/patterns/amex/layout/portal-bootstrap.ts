import { Provider, Type } from '@angular/core';
import {
  AMEX_PORTAL_AUTH_ADAPTER,
  AmexPortalAuthAdapter,
  AMEX_PORTAL_NAVIGATION_ADAPTER,
  AmexPortalNavigationAdapter,
  AMEX_PORTAL_THEME_ADAPTER,
  AmexPortalThemeAdapter,
  AMEX_PORTAL_ANALYTICS_ADAPTER,
  AmexPortalAnalyticsAdapter,
  AMEX_PORTAL_USER_CONTEXT_ADAPTER,
  AmexPortalUserContextAdapter,
  AMEX_PORTAL_FEATURE_FLAG_ADAPTER,
  AmexPortalFeatureFlagAdapter,
} from './adapters';
import { providePortalRuntimeConfig } from './runtime-config';

export interface PortalBootstrapOptions {
  authAdapter?: Type<AmexPortalAuthAdapter> | AmexPortalAuthAdapter;
  navAdapter?: Type<AmexPortalNavigationAdapter> | AmexPortalNavigationAdapter;
  themeAdapter?: Type<AmexPortalThemeAdapter> | AmexPortalThemeAdapter;
  analyticsAdapter?:
    | Type<AmexPortalAnalyticsAdapter>
    | AmexPortalAnalyticsAdapter;
  userContextAdapter?:
    | Type<AmexPortalUserContextAdapter>
    | AmexPortalUserContextAdapter;
  featureFlagAdapter?:
    | Type<AmexPortalFeatureFlagAdapter>
    | AmexPortalFeatureFlagAdapter;
  runtimeConfigUrl?: string | false;
}
function isClass<T>(val: Type<T> | T): val is Type<T> {
  return typeof val === 'function';
}

function bind<T>(token: unknown, val: Type<T> | T): Provider {
  return isClass(val)
    ? { provide: token, useClass: val }
    : { provide: token, useValue: val };
}


export function bootstrapPortal(
  options: PortalBootstrapOptions = {},
): Provider[] {
  const providers: Provider[] = [];

  if (options.authAdapter)
    providers.push(bind(AMEX_PORTAL_AUTH_ADAPTER, options.authAdapter));

  if (options.navAdapter)
    providers.push(bind(AMEX_PORTAL_NAVIGATION_ADAPTER, options.navAdapter));

  if (options.themeAdapter)
    providers.push(bind(AMEX_PORTAL_THEME_ADAPTER, options.themeAdapter));

  if (options.analyticsAdapter)
    providers.push(
      bind(AMEX_PORTAL_ANALYTICS_ADAPTER, options.analyticsAdapter),
    );

  if (options.userContextAdapter)
    providers.push(
      bind(AMEX_PORTAL_USER_CONTEXT_ADAPTER, options.userContextAdapter),
    );

  if (options.featureFlagAdapter)
    providers.push(
      bind(AMEX_PORTAL_FEATURE_FLAG_ADAPTER, options.featureFlagAdapter),
    );

  if (options.runtimeConfigUrl !== false)
    providers.push(
      providePortalRuntimeConfig(
        options.runtimeConfigUrl ?? '/assets/config/portal-config.json',
      ),
    );

  return providers;
}
