import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthApiService } from '@amex/shared-services';
import { EventBusService } from '../../services/event-bus.service';
import {
  LoginCredentials,
  RegisterData,
  AmexLoginFormComponent,
  AmexRegisterFormComponent,
} from '@ui-components/ui';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [AmexLoginFormComponent, AmexRegisterFormComponent],
    template: `
    <!-- LOGIN VIEW -->
    @if (mode === 'login') {
      <amex-login-form
        portalTitle="ONLS Helper Tool"
        [errorMessage]="error"
        [successMessage]="success"
        [showRegister]="true"
        (loginSubmit)="onLogin($event)"
        (forgotPassword)="goToForgotPassword()"
        (registerClick)="setMode('register')">
      </amex-login-form>
    }
    
    <!-- REGISTER VIEW -->
    @if (mode === 'register') {
      <amex-register-form
        portalTitle="ONLS Helper Tool"
        [errorMessage]="error"
        [successMessage]="success"
        (registerSubmit)="onRegister($event)"
        (cancel)="setMode('login')">
      </amex-register-form>
    }
    `
})
export class LoginComponent implements OnInit {

  mode: 'login' | 'register' = 'login';
  error   = '';
  success = '';
  private returnUrl = '/misc/priority-pass';

  constructor(
    private authApi: AuthApiService,
    private bus:    EventBusService,
    private router: Router,
    private route:  ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Already logged in → redirect away
    if (this.authApi.isUserAuthenticated()) {
      this.router.navigateByUrl(this.returnUrl);
      return;
    }
    this.returnUrl = this.sanitizeReturnUrl(
      this.route.snapshot.queryParamMap.get('returnUrl'),
    );
  }

  // Router.navigate()/navigateByUrl() expect a relative path, not a full
  // URL with scheme+host. Whatever upstream sets `returnUrl` (e.g. the
  // shared authGuard redirect) sometimes passes the full
  // window.location.href instead of a relative path — that produced
  // NG04002 "Cannot match any routes" when passed straight through.
  // This also doubles as an open-redirect guard: a cross-origin
  // returnUrl is rejected and falls back to the default route instead
  // of being followed.
  private sanitizeReturnUrl(raw: string | null): string {
    const fallback = '/misc/priority-pass';
    if (!raw) return fallback;

    if (/^https?:\/\//i.test(raw)) {
      try {
        const url = new URL(raw);
        if (url.origin !== window.location.origin) {
          return fallback;
        }
        return `${url.pathname}${url.search}${url.hash}` || fallback;
      } catch {
        return fallback;
      }
    }

    return raw;
  }

  // ── Mode toggle ───────────────────────────────────────────────────

  setMode(m: 'login' | 'register'): void {
    this.mode    = m;
    this.error   = '';
    this.success = '';
  }

  // ── Login ─────────────────────────────────────────────────────────

  onLogin(credentials: LoginCredentials): void {
    this.error   = '';
    this.success = '';

    this.authApi.login({ username: credentials.username, password: credentials.password })
      .subscribe({
        next: (data) => {
          this.bus.emit({
            type: 'USER_LOGGED_IN',
            payload: { username: data.username, roles: data.roles, userId: data.userId },
          });
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (err) => {
          this.error = err.error?.message
            ?? err.error?.data?.message
            ?? 'Login failed. Please check your credentials and try again.';
        },
      });
  }

  // ── Register ──────────────────────────────────────────────────────

  onRegister(data: RegisterData): void {
    this.error   = '';
    this.success = '';

    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    // Map vn-core RegisterData → backend RegisterRequest
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const username = (data.firstName + data.lastName)
      .toLowerCase()
      .replace(/\s+/g, '');

    this.authApi.register({ username, email: data.email, password: data.password, fullName })
      .subscribe({
        next: (res) => {
          this.bus.emit({
            type: 'USER_LOGGED_IN',
            payload: { username: res.username, roles: res.roles, userId: res.userId },
          });
          this.success = 'Account created! Redirecting…';
          setTimeout(() => this.router.navigateByUrl(this.returnUrl), 1500);
        },
        error: (err) => {
          this.error = err.error?.message
            ?? err.error?.data?.message
            ?? 'Registration failed. Please try again.';
        },
      });
  }

  // ── Navigation ────────────────────────────────────────────────────

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}