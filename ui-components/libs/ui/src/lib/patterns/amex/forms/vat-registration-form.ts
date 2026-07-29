import { Component, Output, EventEmitter, HostBinding, Input } from '@angular/core';
import { AccentCardComponent } from '../../../composite/amex/accent-card';
import { ButtonComponent } from '../../../primitives/button';

@Component({
  selector: 'amex-vat-registration-form',
  standalone: true,
  imports: [AccentCardComponent, ButtonComponent],
  template: `
    <ui-accent-card class="vrf" [accentColor]="'#7b1fa2'" [maxWidth]="'640px'">
      <div class="vrf__title">VAT Registration</div>

      <p class="vrf__intro">Please provide the VAT registration details in the following steps:</p>

      <div class="vrf__step">
        <ui-button class="vrf__step-btn" variant="primary" label="Upload Certificate"
          (click)="stepClick.emit('upload')"></ui-button>
        <span class="vrf__step-desc">Submit the VAT registration details and certificate</span>
      </div>
      <div class="vrf__step">
        <ui-button class="vrf__step-btn" variant="primary" label="Merchant Registration"
          (click)="stepClick.emit('merchant')"></ui-button>
        <span class="vrf__step-desc">Link the VAT registration number to specific outlets</span>
      </div>
      <div class="vrf__step">
        <ui-button class="vrf__step-btn" variant="primary" label="TAX Invoice Delivery"
          (click)="stepClick.emit('delivery')"></ui-button>
        <span class="vrf__step-desc">Provide frequency and contact details for VAT Invoice Delivery</span>
      </div>

      <div class="vrf__section-title">Download Tax Invoices</div>
      <ui-accent-card class="vrf__sub-card" [accentColor]="'#7b1fa2'" [padding]="'16px 20px'">
        <ui-button class="vrf__step-btn" variant="primary"
          label="Download Tax Invoices" (click)="stepClick.emit('download')"></ui-button>
      </ui-accent-card>

      <div class="vrf__back-row">
        <ui-button class="vrf__btn vrf__btn--back" variant="primary" [label]="'Back'"
          (click)="backClick.emit()"></ui-button>
      </div>
    </ui-accent-card>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 4px;
      --btn-padding: 9px 20px; --btn-font-size: 13px;
    }
    .vrf__title { font-size: 16px; font-weight: bold; color: #1a3a6b; letter-spacing: 0.5px; margin: 0 0 16px; }
    .vrf__intro { font-size: 13px; color: #333; margin: 0 0 20px; }
    .vrf__step { display: flex; align-items: center; gap: 20px; margin-bottom: 16px; }
    .vrf__step-btn { min-width: 180px; text-align: center; }
    .vrf__step-desc { font-size: 13px; color: #555; }
    .vrf__section-title { font-size: 15px; color: #1a3a6b; font-style: italic; font-weight: bold; margin: 16px 0 8px; padding-top: 16px; border-top: 1px solid #e0e0e0; }
    .vrf__sub-card { margin-bottom: 4px; }
    .vrf__back-row { display: flex; justify-content: center; margin-top: 20px; }
    .vrf__btn--back { --btn-padding: 9px 32px; --btn-font-size: 14px; }
  `],
})
export class AmexVATRegistrationFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `vat-registration-form-${++AmexVATRegistrationFormComponent._idCounter}`;

  @Output() stepClick = new EventEmitter<string>();
  @Output() backClick = new EventEmitter<void>();
}