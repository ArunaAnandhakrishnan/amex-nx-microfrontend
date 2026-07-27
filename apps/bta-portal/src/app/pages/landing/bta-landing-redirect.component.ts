import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@amex/shared-services';

// Replaces the old hardcoded `redirectTo: 'user-management'` default route.
// That silently locked out ROLE_CORP_USER / ROLE_TA_USER — they'd land on
// an admin-only page, get bounced by roleGuard, and it looked like login
// itself had failed. This mirrors AppComponent.buildNav()'s role priority
// so every role lands on the first page they actually have access to.
@Component({
  selector: 'bta-landing-redirect',
  standalone: true,
  template: '',
})
export class BtaLandingRedirectComponent implements OnInit {
  constructor(
    private session: SessionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const target = this.resolveLandingRoute();
    this.router.navigate(['/bta', target]);
  }

  private resolveLandingRoute(): string {
    if (this.session.hasRole('ROLE_AEME_INTERNAL_ADMIN')) return 'user-management';
    if (this.session.hasAnyRole(['ROLE_CORP_MASTER_ADMIN', 'ROLE_CORP_SUB_ADMIN'])) return 'user-management';
    if (this.session.hasRole('ROLE_CORP_USER')) return 'memo-statement';
    if (this.session.hasAnyRole(['ROLE_TA_MASTER_ADMIN', 'ROLE_TA_SUB_ADMIN'])) return 'user-management';
    if (this.session.hasRole('ROLE_TA_USER')) return 'case-management';
    // No recognized role — send to a route every guard will reject,
    // rather than silently guessing an admin page.
    return 'user-management';
  }
}
