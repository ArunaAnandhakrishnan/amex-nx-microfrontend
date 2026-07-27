import { Component, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexPageComponent,
  AmexTabItem,
} from '@ui-components/ui';
import { CenLcyExcComponent } from './cen-lcy-exc.component';
import { SHELL_HOSTED } from '../../constants/shell.token';
import { LOGIN_APP_URL } from '@amex/shared-services';

@Component({
  selector: 'app-cen-lcy-exc-shell-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageComponent, CenLcyExcComponent],
  template: `
    <amex-page-component
      portalStyle="onls"
      portalTitle="ONLS Helper Tool"
      [config]="shellConfig"
      [showSidebar]="false"
      
      (tabClick)="onTabClick($event)"
      (logout)="onLogout()"
    >
      <app-cen-lcy-exc></app-cen-lcy-exc>
    </amex-page-component>
  `,
})
export class CenLcyExcShellWrapperComponent {
  isShellHosted: boolean;

  constructor(
    @Optional() @Inject(SHELL_HOSTED) shellHosted: boolean,
    @Inject(LOGIN_APP_URL) private loginAppUrl: string,
  ) {
    this.isShellHosted = !!shellHosted;
  }

  get shellConfig() {
    if (this.isShellHosted) {
      return {
        header:  { visible: false },
        footer:  { visible: false },
        sidebar: { visible: false },
      };
    }
    return {
      header:  { visible: false },
      footer:  { visible: true, text: '© American Express. All rights reserved.' },
      sidebar: { visible: false },
    };
  }

  tabs: AmexTabItem[] = [
    { id: 'cen-lcy-exc', label: 'Cen LCY EXC' },
  ];

  onTabClick(_id: string): void {}

  onLogout(): void {
    // TODO: verify against @amex/shared-services — this should call the
    // shared logout endpoint (e.g. AuthApiService.logout()) to clear the
    // HttpOnly session cookie server-side before redirecting. Redirecting
    // alone does not invalidate the cookie.
    window.location.href = this.loginAppUrl;
  }
}
