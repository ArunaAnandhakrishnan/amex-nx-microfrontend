import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmexPageComponent, AmexRegisterFormComponent, RegisterData } from '@ui-components/ui';
import { AuthService } from './auth.service';
import { resolvePortalStyle } from './portal-style.util';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [AmexPageComponent, AmexRegisterFormComponent],
  template: `
    <amex-page-component
      [portalStyle]="portalStyle"
      [portalTitle]="portalTitle"
      [showHeader]="portalStyle === 'oms'"
      [showSidebar]="false"
      [showFooter]="false">

     <div class="register-page-wrapper" [class.oms-layout]="portalStyle === 'oms'">

  <div class="register-form-col">
    <div class="register-heading" *ngIf="portalStyle === 'oms'">
      <h2>Merchant Validation</h2>
      <p>To create your username and password, please enter the following details</p>
    </div>

    <amex-register-form
      [portalTitle]="portalTitle"
      [portalStyle]="portalStyle"
      [errorMessage]="errorMessage"
      [successMessage]="successMessage"
      (registerSubmit)="onRegisterSubmit($event)"
      (cancel)="onCancel()">
    </amex-register-form>
  </div>

  <div class="register-hero-col" *ngIf="portalStyle === 'oms'">
    <img src="/assets/images/oms-register-hero.jpg" alt="" class="register-hero-image" />
  </div>

</div>

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
export class RegisterPageComponent {
  errorMessage = '';
  successMessage = '';
  private returnUrl = '';

  portalTitle = 'Register';
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

  onRegisterSubmit(data: RegisterData): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.auth.register(data).subscribe({
      next: () => {
        // Matches screenshot 3: "User Created Successfully" card with an Ok
        // button. AmexRegisterFormComponent (OMS) swaps to this card itself
        // once successMessage is set — no navigation needed here.
        this.successMessage =
          'Your Email Address has been successfully verified. Please click here to login with your new User ID and Password. Your submissions and settlements Data will be available within 24 hours. Thank you for registering on Online Merchant Services.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Registration failed. Please check your details.';
        this.cdr.detectChanges();
      },
    });
  }

  // Handles both "Back" (before submit) and "Ok" (after success, per screenshot 3)
  onCancel(): void {
    this.router.navigate(['/login'], {
      queryParams: this.returnUrl ? { returnUrl: this.returnUrl } : {},
    });
  }
}