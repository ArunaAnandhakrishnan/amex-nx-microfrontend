import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthApiService, AuthResponse } from '@amex/shared-services';
import { RegisterData } from '@ui-components/ui';

export type LoginResult = AuthResponse;

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authApi: AuthApiService, private router: Router) {}

  login(username: string, password: string): Observable<LoginResult> {
    return this.authApi.login({ username, password });
  }

  forgotPassword(userId: string, emailId: string): Observable<string> {
    return this.authApi.forgotPassword(userId, emailId);
  }

  // NOTE: AuthApiService needs a `register(data)` method added — wire this
  // to whatever your registration endpoint is.
  register(data: RegisterData): Observable<string> {
    return this.authApi.registerOms(data);
  }

  // NOTE: AuthApiService needs a `forgotUserId(email, merchantNumber?)` method.
  forgotUserId(email: string, merchantNumber?: string): Observable<string> {
    return this.authApi.forgotUserId(email, merchantNumber);
  }

  getUser() {
    return this.authApi.getUser();
  }

  getUsername(): string {
    return this.authApi.getUsername();
  }

  isAuthenticated(): boolean {
    return this.authApi.isAuthenticated();
  }

  logout(): void {
    this.authApi.performLogout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login']),
    });
  }
}