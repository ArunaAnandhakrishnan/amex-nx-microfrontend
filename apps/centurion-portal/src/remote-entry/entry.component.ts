import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmexPageComponent } from '@ui-components/ui';

@Component({
  selector: 'cent-entry',
  standalone: true,
  imports: [RouterOutlet, AmexPageComponent],
  template: `
    <amex-page-component
      portalStyle="onls"
      [showSidebar]="false"
      [config]="shellConfig">
      <router-outlet></router-outlet>
    </amex-page-component>
  `,
})
export class CentEntryComponent {
  shellConfig = {
    header: { visible: false },
    footer: { visible: false },
    sidebar: { visible: false },
  };
}
