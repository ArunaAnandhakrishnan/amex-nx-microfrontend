import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AccentCardComponent
} from '@ui-components/ui';

export interface EditProfileMenuLink {
  id: string;
  label: string;
}

/**
 * OmsEditProfileMenu
 * "Edit Your Profile" landing card - purple-accent card with a plain
 * list of links to the profile sub-sections (Add/Delete Merchant Account,
 * Update Merchant Account Details, Add/Edit Contact Information,
 * Report Format, VAT Registration & Tax Invoices).
 * Doubles as the profile section's nav (replaces amex-page-component's
 * built-in sidebar, which is disabled via showSidebar="false" in
 * remote-entry.html): it now stays on screen across all profile sub-pages
 * and highlights the current one via [activeId], instead of only showing
 * on the landing view. Each click still just emits the link's id;
 * remote-entry.ts wires that straight into the existing onMenuChanged nav.
 * OMS-only, so this lives in the app instead of the shared ui-components lib.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-edit-profile-menu',

  standalone: true,

  imports: [
    CommonModule,
    AccentCardComponent
  ],

  templateUrl:
    './oms-edit-profile-menu.component.html',

  styleUrls: [
    './oms-edit-profile-menu.component.css'
  ]
})
export class OmsEditProfileMenuComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `edit-profile-menu-${++OmsEditProfileMenuComponent._idCounter}`;

  @Input() title = 'EDIT YOUR PROFILE';
  @Input() accentColor = '#7b1f4b';
  @Input() activeId = '';
  @Input() links: EditProfileMenuLink[] = [
    { id: 'merchantaccount', label: 'Add/Delete a Merchant Account' },
    { id: 'editprofile', label: 'Update Merchant Account Details' },
    { id: 'contactinformation', label: 'Add/Edit Contact Information' },
    { id: 'reportformat', label: 'Report Format' },
    { id: 'vatregistration', label: 'VAT Registration & Tax Invoices' },
  ];

  @Output() linkClicked = new EventEmitter<string>();

  onLinkClick(id: string) {
    this.linkClicked.emit(id);
  }
}