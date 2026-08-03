import { InjectionToken } from '@angular/core';
import { AmexTabItem } from '../navigation/tab-bar';
import { AmexSidebarMenuItem } from '../navigation/sidebar-menu';

export interface AmexPortalAuthAdapter {
  getUsername(): string;
  logout(): void;
}
export const AMEX_PORTAL_AUTH_ADAPTER =
  new InjectionToken<AmexPortalAuthAdapter>('AMEX_PORTAL_AUTH_ADAPTER');

export interface AmexPortalNavigationAdapter {
  getTabs?(): AmexTabItem[];
  getSidebarItems?(): AmexSidebarMenuItem[];
  onTabClick?(id: string): void;
  onSidebarClick?(id: string): void;
}
export const AMEX_PORTAL_NAVIGATION_ADAPTER =
  new InjectionToken<AmexPortalNavigationAdapter>(
    'AMEX_PORTAL_NAVIGATION_ADAPTER',
  );

export interface AmexPortalThemeAdapter {
  getTheme(): string;
  applyTheme(theme: string): void;
  onThemeChange?(callback: (theme: string) => void): void;
}
export const AMEX_PORTAL_THEME_ADAPTER =
  new InjectionToken<AmexPortalThemeAdapter>('AMEX_PORTAL_THEME_ADAPTER');
export interface AmexPortalAnalyticsAdapter {
  trackPageView(pageName: string, metadata?: Record<string, unknown>): void;
  trackEvent(event: string, metadata?: Record<string, unknown>): void;
}
export const AMEX_PORTAL_ANALYTICS_ADAPTER =
  new InjectionToken<AmexPortalAnalyticsAdapter>(
    'AMEX_PORTAL_ANALYTICS_ADAPTER',
  );
export interface AmexPortalUserContextAdapter {
  getUserId(): string;
  getRoles(): string[];
  hasRole(role: string): boolean;
  getLocale(): string;
}
export const AMEX_PORTAL_USER_CONTEXT_ADAPTER =
  new InjectionToken<AmexPortalUserContextAdapter>(
    'AMEX_PORTAL_USER_CONTEXT_ADAPTER',
  );

export interface AmexPortalFeatureFlagAdapter {
  isEnabled(flag: string): boolean;
  getFlags(): Record<string, boolean>;
}
export const AMEX_PORTAL_FEATURE_FLAG_ADAPTER =
  new InjectionToken<AmexPortalFeatureFlagAdapter>(
    'AMEX_PORTAL_FEATURE_FLAG_ADAPTER',
  );
