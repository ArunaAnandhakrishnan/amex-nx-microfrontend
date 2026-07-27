import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmexPageComponent } from '@ui-components/ui';

@Component({
  selector: 'supp-entry',
  standalone: true,
  imports: [RouterOutlet, AmexPageComponent],
  template: `
    <amex-page-component
      portalStyle="onls"
      pageTitle="SUPPLEMENTARY ACCESS HELPER"
      [showHeader]="false"
      [showFooter]="false"
      [showSidebar]="false">
      <router-outlet></router-outlet>
    </amex-page-component>
  `,
})
export class SuppEntryComponent {}
