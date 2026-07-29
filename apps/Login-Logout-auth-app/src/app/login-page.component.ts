import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AmexPageComponent, AmexLoginFormComponent, ButtonComponent, LoginCredentials } from '@ui-components/ui';
import { AuthService } from './auth.service';
import { resolvePortalStyle } from './portal-style.util';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, AmexPageComponent, AmexLoginFormComponent, ButtonComponent],
  template: `
    <amex-page-component
      [portalStyle]="portalStyle"
      [portalTitle]="portalTitle"
      [showHeader]="portalStyle === 'oms'"
      [showSidebar]="false"
      [showFooter]="false">

      <div class="login-page-wrapper" [class.oms-wrapper]="portalStyle === 'oms'">

        <amex-login-form
          [portalTitle]="portalTitle"
          [portalStyle]="portalStyle"
          [errorMessage]="errorMessage"
          [showRegister]="showRegister"
          (loginSubmit)="onLoginSubmit($event)"
          (forgotPassword)="onForgotPassword()"
          (forgotUserId)="onForgotUserId()"
          (registerClick)="onRegisterClick()">
        </amex-login-form>

        <div class="oms-guide-buttons" *ngIf="showGuideButtons">
          <ui-button
            class="btn-guide"
            variant="primary"
            label="Download User Guide"
            ariaLabel="Download User Guide"
            (click)="onDownloadUserGuide()">
          </ui-button>
          <ui-button
            class="btn-guide"
            variant="primary"
            label="User guide Video"
            ariaLabel="User guide Video"
            (click)="onUserGuideVideo()">
          </ui-button>
        </div>

      </div>

    </amex-page-component>
  `,
  styles: [`
    .login-page-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }


    .oms-wrapper {
      align-items: flex-start;
    }

    .oms-wrapper ::ng-deep amex-login-form .amex-shell {
      min-height: 0;
      background: transparent;
    }

    .oms-guide-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 250px;
      margin: 4px 24px 0;
      box-sizing: border-box;
    }

    .btn-guide {
      --btn-bg: #8a1a7b;
      --btn-color: #fff;
      --btn-radius: 4px;
      --btn-padding: 11px 0;
      --btn-justify-content: center;
      --btn-width: 100%;
      --btn-font-size: 13px;
      --btn-font-weight: 600;
      display: block;
    }

    ::ng-deep amex-page-component .oms-logout-btn,
    ::ng-deep amex-page-component [class*="logout"] {
    display: none !important;
}
  `],
})
export class LoginPageComponent {
  errorMessage = '';
  private returnUrl = '';

  portalTitle = 'Login Page';
  portalStyle: 'onls' | 'oms' = 'onls';
  showRegister = false;
  showGuideButtons = false;

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
      this.showRegister = true;
      this.showGuideButtons = true;
    }
  }

  onLoginSubmit(creds: LoginCredentials): void {
    this.auth.login(creds.username, creds.password).subscribe({
      next: () => {
        if (this.returnUrl) {
          window.location.href = decodeURIComponent(this.returnUrl);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Invalid User ID or Password.';
        this.cdr.detectChanges();
      },
    });
  }

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password'], {
      queryParams: this.returnUrl ? { returnUrl: this.returnUrl } : {},
    });
  }

  onForgotUserId(): void {
    this.router.navigate(['/forgot-user-id'], {
      queryParams: this.returnUrl ? { returnUrl: this.returnUrl } : {},
    });
  }

  onRegisterClick(): void {
    this.router.navigate(['/register'], {
      queryParams: this.returnUrl ? { returnUrl: this.returnUrl } : {},
    });
  }

  onDownloadUserGuide(): void {
    window.open('/assets/docs/oms-user-guide.pdf', '_blank');
  }

  onUserGuideVideo(): void {
    window.open('https://your-video-url-here', '_blank');
  }
}