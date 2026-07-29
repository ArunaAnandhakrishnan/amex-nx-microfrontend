import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AccentCardComponent,
  CheckboxComponent,
  RadioComponent,
  InputComponent,
  ButtonComponent,
  LabelComponent
} from '@ui-components/ui';

export interface ReportFormatOption {
  value: string;
  label: string;
}

export interface ReportFormatFormData {
  receiveByEmail: boolean;
  settlementAdviceFormat: string;
  submissionDetailsFormat: string;
  emailAddresses: string[];
}

/**
 * ReportFormatPanel
 * "Select your report formats" card on the OMS Edit Profile > Report Format
 * page. Built the same way as amex-merchant-details-panel — a local
 * pattern component in the page folder, composed only from ui-components
 * primitives (ui-accent-card, ui-checkbox, ui-radio, ui-input, ui-button,
 * ui-label), not a new component inside the ui-components lib.
 * Two accent-cards: first holds the email checkbox + Settlement Advice /
 * Submission Details radio groups + Submit; second holds the
 * Add Email Address section. Back button sits below both, page-level.
 * Source: OMS Report Format page.
 */
@Component({
  selector: 'oms-report-format-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AccentCardComponent,
    CheckboxComponent,
    RadioComponent,
    InputComponent,
    ButtonComponent,
    LabelComponent
  ],
  templateUrl: './report-format-panel.html',
  styles: [`
    :host {
      display: block;
      width: 100%;
      font-family: Arial, sans-serif;
    }

    .rfp__title {
      font-size: 15px;
      font-weight: bold;
      color: #1a3a6b;
      padding: 0 0 8px;
    }

    .rfp__email-check { margin-bottom: 20px; }

    .rfp__group-legend {
      font-size: 15px;
      font-weight: bold;
      color: #1a3a6b;
      margin: 0 0 10px;
    }
    .rfp__group { margin-bottom: 22px; }
    .rfp__group:last-of-type { margin-bottom: 0; }
    .rfp__radio-list { display: flex; flex-direction: column; gap: 8px; }

    .rfp__submit-row { display: flex; justify-content: flex-end; margin-top: 20px; }

    .rfp__email-card-title {
      font-size: 13px;
      font-weight: bold;
      color: #333;
      margin: 0 0 10px;
    }
    .rfp__email-row { display: flex; gap: 8px; margin-bottom: 16px; align-items: flex-start; }
    .rfp__email-input { flex: 1; }
    .rfp__email-note { font-size: 13px; font-weight: bold; color: #1a3a6b; margin-bottom: 8px; }
    .rfp__email-list { display: flex; flex-direction: column; gap: 4px; }
    .rfp__email-item { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #333; padding: 3px 0; }
    .rfp__email-remove { color: #c62828; cursor: pointer; font-size: 16px; padding: 0 4px; }

    .rfp__back-row { display: flex; justify-content: flex-end; margin-top: 20px; }

    .rfp__btn--submit { --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 8px 28px; --btn-font-size: 14px; }
    .rfp__btn--add { --btn-bg: #7b6fa3; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 7px 18px; --btn-font-size: 13px; }
    .rfp__btn--back { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 8px 28px; --btn-font-size: 14px; }
  `],
})
export class OmsReportFormatPanelComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `report-format-panel-${++OmsReportFormatPanelComponent._idCounter}`;

  @Input() accentColor = '#7b1f4b';
  @Input() titleText = 'Select your report formats';

  @Input() emailCheckboxLabel = 'I would like to receive payment details by email.';

  @Input() settlementLegend = 'Settlement Advice:';
  @Input() settlementOptions: ReportFormatOption[] = [
    { value: 'pdf', label: 'Adobe PDF' },
    { value: 'excel', label: 'Microsoft Excel' },
  ];

  @Input() submissionLegend = 'Submission Details:';
  @Input() submissionOptions: ReportFormatOption[] = [
    { value: 'pdf', label: 'Adobe PDF' },
    { value: 'excel', label: 'Microsoft Excel' },
    { value: 'csv', label: 'Comma Separated Values (CSV)' },
    { value: 'extended_csv', label: 'Extended (CSV)' },
    { value: 'merchant_excel', label: 'Merchant Extended Excel' },
    { value: 'online_csv', label: 'Online Merchants (CSV)' },
  ];

  @Input() submitLabel = 'Submit';
  @Input() backLabel = 'Back';

  @Input() addEmailLabel = 'Add Email Address:';
  @Input() addButtonLabel = 'Add';
  @Input() registeredEmailsNote = 'Email address(es) registered for receiving payment details via email are';

  @Input() form: ReportFormatFormData = {
    receiveByEmail: false,
    settlementAdviceFormat: 'pdf',
    submissionDetailsFormat: 'pdf',
    emailAddresses: [],
  };

  newEmail = '';

  @Output() submitClick = new EventEmitter<ReportFormatFormData>();
  @Output() backClick = new EventEmitter<void>();

  onSettlementChange(value: string | number) {
    this.form.settlementAdviceFormat = String(value);
  }

  onSubmissionChange(value: string | number) {
    this.form.submissionDetailsFormat = String(value);
  }

  addEmail() {
    if (this.newEmail.trim()) {
      this.form.emailAddresses = [...this.form.emailAddresses, this.newEmail.trim()];
      this.newEmail = '';
    }
  }

  removeEmail(i: number) {
    this.form.emailAddresses = this.form.emailAddresses.filter((_, idx) => idx !== i);
  }

  onSubmit() {
    this.submitClick.emit(this.form);
  }
}