import { InjectionToken } from '@angular/core';

/**
 * SHELL_TOKEN
 * Injection token used by remote micro-frontends to receive context
 * from the shell (e.g., active user, feature flags, theme).
 * Provide this in the shell's AppModule / app.config.ts and
 * consume it in remote entry components.
 */
export const SHELL_TOKEN = new InjectionToken<ShellContext>('SHELL_TOKEN');

export interface ShellContext {
  userId:       string;
  roles:        string[];
  featureFlags: Record<string, boolean>;
}
