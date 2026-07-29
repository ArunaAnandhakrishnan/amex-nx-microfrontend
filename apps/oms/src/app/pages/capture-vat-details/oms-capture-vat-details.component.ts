import {
  Component,
  EventEmitter,
  Input,
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
  SelectComponent,
  ButtonComponent,
  LabelComponent
} from '@ui-components/ui';

export interface CaptureVatDetailsData {
  vatRegistrationNumber: string;
  vatRegistrationCountry: string;
}

/**
 * OmsCaptureVatDetails
 * "Capture VAT Registration Details" — Step 1 of the Upload Certificate
 * flow. VAT Registration Number + VAT Registration Country, Back/Search.
 * Local page component (not in ui-components lib), composed only from
 * ui-accent-card + ui-input + ui-select + ui-button + ui-label, same
 * convention as amex-merchant-details-panel.
 * Source: OMS VAT Registration (image2)
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-capture-vat-details',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    AccentCardComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    LabelComponent
  ],

  templateUrl:
    './oms-capture-vat-details.component.html',

  styles: [`
    :host {
      display: block;
      width: 100%;
      font-family: Arial, sans-serif;
    }

    .cvd__title {
      font-size: 15px;
      font-weight: bold;
      color: #1a3a6b;
      padding: 0 0 8px;
    }

    .cvd__step-info {
      font-size: 13px;
      color: #333;
      margin-bottom: 20px;
    }

    .cvd__field { margin-bottom: 16px; max-width: 340px; }
    .cvd__field-label { display: block; margin-bottom: 6px; }

    .cvd__error {
      font-size: 12px;
      color: #c62828;
      margin-top: 4px;
    }

    .cvd__actions { display: flex; gap: 10px; margin-top: 10px; }

    .cvd__btn--back { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 14px; }
    .cvd__btn--search { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 14px; }
  `],
})
export class OmsCaptureVatDetailsComponent {

  @Input()
  showError = false;

  countries = [
    { value: 'BH', label: 'Bahrain' },
    { value: 'AE', label: 'United Arab Emirates' },
    { value: 'KW', label: 'Kuwait' },
    { value: 'OM', label: 'Oman' },
    { value: 'QA', label: 'Qatar' },
    { value: 'SA', label: 'Saudi Arabia' },
  ];

  form: CaptureVatDetailsData = {
    vatRegistrationNumber: '',
    vatRegistrationCountry: 'BH'
  };

  @Output()
  searchClicked =
    new EventEmitter<CaptureVatDetailsData>();

  @Output()
  backClicked =
    new EventEmitter<void>();

  onSearch() {

    if (!this.form.vatRegistrationNumber?.trim()) {

      this.showError = true;

      return;
    }

    this.showError = false;

    console.log(
      'Capture VAT Details Search:',
      this.form
    );

    this.searchClicked.emit(this.form);
  }

  onBack() {

    console.log(
      'Back Clicked'
    );

    this.backClicked.emit();
  }
}