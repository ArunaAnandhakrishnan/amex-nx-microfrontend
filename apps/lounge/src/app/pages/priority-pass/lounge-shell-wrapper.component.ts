import {
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexPageComponent,
  AmexTabItem,
} from '@ui-components/ui';
import {
  AuthService,
  StandaloneLaunchService,
} from '@amex/shared-services';
import { LoungePriorityPassComponent } from './lounge-priority-pass.component';
import { SHELL_HOSTED } from '../../constants/shell.token';

@Component({
  selector: 'app-lounge-shell-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    AmexPageComponent,
    LoungePriorityPassComponent,
  ],
  template: `
    <amex-page-component
      portalStyle="onls"
      portalTitle="ONLS Helper Tool"
      [config]="shellConfig"
      [showSidebar]="false"
      pageTitle="PRIORITY PASS™ ENROLLMENT"
      pageSubtitle="Manage Priority Pass benefit for cardmembers"
      (tabClick)="onTabClick($event)"
      (logout)="onLogout()"
    >
      <app-lounge-priority-pass></app-lounge-priority-pass>
    </amex-page-component>
  `,
})
export class LoungeShellWrapperComponent implements OnInit {

  tabs: AmexTabItem[] = [
    {
      id: 'lounge',
      label: 'Lounge Rationalization',
    },
  ];

  constructor(
    @Optional()
    @Inject(SHELL_HOSTED)
    private readonly shellHosted: boolean | null,

    private readonly standaloneLaunchService: StandaloneLaunchService,

    private readonly authService: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {

    /**
     * Direct standalone launch.
     * If the portal is opened directly (localhost:4209),
     * validate the session and redirect to the Shell.
     *
     * When hosted inside the Shell, skip this logic.
     */
    if (!this.shellHosted) {
      await this.standaloneLaunchService.launch('/misc/priority-pass');
      return;
    }
  }

  get isShellHosted(): boolean {
    return !!this.shellHosted;
  }

  get shellConfig() {
    if (this.isShellHosted) {
      return {
        header: {
          visible: false,
        },
        footer: {
          visible: false,
        },
        sidebar: {
          visible: false,
        },
      };
    }

    return {
      header: {
        visible: false,
      },
      footer: {
        visible: true,
        text: '© American Express. All rights reserved.',
      },
      sidebar: {
        visible: false,
      },
    };
  }

  onTabClick(_id: string): void {
    // Reserved for future tabs
  }

  onLogout(): void {
    this.authService.performLogout();
  }
}