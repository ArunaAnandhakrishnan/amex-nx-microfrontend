import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  AccentCardComponent,
  InputComponent,
  ButtonComponent,
  LabelComponent
} from '@ui-components/ui';

/**
 * OmsVatOutletLinking
 * "VAT Outlet Linking" — the "Merchant Registration" step of VAT
 * Registration. Links a VAT registration number to a specific outlet
 * via its American Express Merchant Number. Back/Search.
 * Local page component (not in ui-components lib), same convention as
 * amex-merchant-details-panel / oms-capture-vat-details.
 * Source: OMS VAT Registration (image3)
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-vat-outlet-linking',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    AccentCardComponent,
    InputComponent,
    ButtonComponent,
    LabelComponent
  ],

  templateUrl:
    './oms-vat-outlet-linking.component.html',

  styles: [`
    :host {
      display: block;
      width: 100%;
      font-family: Arial, sans-serif;
    }

    .vol__title {
      font-size: 15px;
      font-weight: bold;
      color: #1a3a6b;
      padding: 0 0 8px;
    }

    .vol__field { margin-bottom: 16px; max-width: 340px; }
    .vol__field-label { display: block; margin-bottom: 6px; }

    .vol__error {
      font-size: 12px;
      color: #c62828;
      margin-top: 4px;
    }

    .vol__actions { display: flex; gap: 10px; margin-top: 10px; }

    .vol__btn--back { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 14px; }
    .vol__btn--search { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 14px; }
  `],
})
export class OmsVatOutletLinkingComponent {

  merchantNumber = '';

  showError = false;

  @Output()
  searchClicked =
    new EventEmitter<string>();

  @Output()
  backClicked =
    new EventEmitter<void>();

  onSearch() {

    if (!this.merchantNumber?.trim()) {

      this.showError = true;

      return;
    }

    this.showError = false;

    console.log(
      'VAT Outlet Linking Search:',
      this.merchantNumber
    );

    this.searchClicked.emit(this.merchantNumber);
  }

  onBack() {

    console.log(
      'Back Clicked'
    );

    this.backClicked.emit();
  }
}