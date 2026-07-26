import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmexForgotPasswordFormComponent ,AmexPageComponent} from '@ui-components/ui';
import { AuthService } from './auth.service';
import { resolvePortalStyle } from './portal-style.util';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [AmexPageComponent,AmexForgotPasswordFormComponent],
  template: `
  <amex-page-component
      [portalStyle]="portalStyle"
      [portalTitle]="portalTitle"
      [showHeader]="portalStyle === 'oms'"
      [showSidebar]="false"
      [showFooter]="false">

    <amex-forgot-password-form
      [portalTitle]="portalTitle"
      [portalStyle]="portalStyle"
      [errorMessage]="errorMessage"
      [success]="success"
      (submitIdentifier)="onSubmit($event)"
      (submitOmsRequest)="onSubmitOms($event)"
      (backToLogin)="goToLogin()">
    </amex-forgot-password-form>

    </amex-page-component>
  `,

  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    ::ng-deep amex-page-component {
      min-height: 0;
    }

    ::ng-deep amex-page-component .oms-logout-btn,
    ::ng-deep amex-page-component [class*="logout"] {
      display: none !important;
    }
  `],
})
export class ForgotPasswordPageComponent {
  errorMessage = '';
  success = false;
  private returnUrl = '';

  portalTitle = 'Login Page';
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

  onSubmit(data: { userId: string; emailId: string }): void {
    this.errorMessage = '';
    this.success = false;

    this.auth.forgotPassword(data.userId, data.emailId).subscribe({
      next: () => {
        this.success = true;
      },
      error: (err) => {
        this.errorMessage = 'Invalid User ID or Email ID.';
        this.cdr.detectChanges();
      },
    });
  }

  // OMS flow submits 5 fields (screenshot 5): userId, emailId, merchantNumber,
  // ibanLast5, tradeLicenseNumber. Currently only userId/emailId are forwarded
  // since AuthService.forgotPassword() doesn't accept the other 3 yet.
  onSubmitOms(data: {
    userId: string;
    emailId: string;
    merchantNumber: string;
    ibanLast5: string;
    tradeLicenseNumber: string;
  }): void {
    this.errorMessage = '';
    this.success = false;

    this.auth.forgotPassword(data.userId, data.emailId).subscribe({
      next: () => {
        this.success = true;
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Invalid details provided.';
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