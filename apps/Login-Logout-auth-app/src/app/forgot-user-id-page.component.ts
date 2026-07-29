import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmexPageComponent, AmexForgotUserIdFormComponent, ForgotUserIdRequest } from '@ui-components/ui';
import { AuthService } from './auth.service';
import { resolvePortalStyle } from './portal-style.util';

@Component({
  selector: 'app-forgot-user-id-page',
  standalone: true,
  imports: [AmexPageComponent, AmexForgotUserIdFormComponent],
  template: `
    <amex-page-component
      [portalStyle]="portalStyle"
      [portalTitle]="portalTitle"
      [showHeader]="portalStyle === 'oms'"
      [showSidebar]="false"
      [showFooter]="false">

      <div class="forgot-user-id-page-wrapper">
        <amex-forgot-user-id-form
          [portalTitle]="portalTitle"
          [portalStyle]="portalStyle"
          [errorMessage]="errorMessage"
          (submitEmail)="onSubmitOnls($event)"
          (submitRequest)="onSubmitOms($event)"
          (backToLogin)="goToLogin()">
        </amex-forgot-user-id-form>
      </div>

    </amex-page-component>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    ::ng-deep amex-page-component {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    ::ng-deep amex-page-component .oms-logout-btn,
    ::ng-deep amex-page-component [class*="logout"] {
      display: none !important;
    }

    .forgot-user-id-page-wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 24px;
    }

    ::ng-deep amex-forgot-user-id-form .oms-card {
      background: transparent;
      box-shadow: none;
    }

    ::ng-deep amex-forgot-user-id-form .amex-shell {
      min-height: 0;
      background: transparent;
    }
  `],
})
export class ForgotUserIdPageComponent {
  errorMessage = '';
  private returnUrl = '';

  portalTitle = 'Forgot User ID';
  portalStyle: 'onls' | 'oms' = 'onls';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    this.portalStyle = resolvePortalStyle(this.returnUrl);
    if (this.portalStyle === 'oms') {
      this.portalTitle = '';
    }
  }

  // ONLS flow: email only
  onSubmitOnls(email: string): void {
    this.errorMessage = '';
    this.auth.forgotUserId(email).subscribe({
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Unable to process request.';
        this.cdr.detectChanges();
      },
    });
  }

  // OMS flow: email + merchant number
  onSubmitOms(request: ForgotUserIdRequest): void {
    this.errorMessage = '';
    this.auth.forgotUserId(request.emailAddress, request.merchantNumber).subscribe({
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Unable to process request.';
        this.cdr.detectChanges();
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login'], {
      queryParams: this.returnUrl ? { returnUrl: this.returnUrl } : {},
    });
  }
}