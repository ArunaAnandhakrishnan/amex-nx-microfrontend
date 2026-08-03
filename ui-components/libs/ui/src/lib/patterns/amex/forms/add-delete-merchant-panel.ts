import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../composite/form-field';
import { AccentCardComponent } from '../../../composite/amex/accent-card';
import { InputComponent } from '../../../primitives/input';
import { CheckboxComponent } from '../../../primitives/checkbox';
import { ButtonComponent } from '../../../primitives/button';

export interface MerchantOption {
  merchantNo: string;
  label: string;
}
@Component({
  selector: 'amex-add-delete-merchant-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormFieldComponent,
    AccentCardComponent,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
  ],
  template: `
    <ui-accent-card
      class="admp"
      [accentColor]="cardAccentColor"
      [maxWidth]="cardMaxWidth"
      [padding]="cardPadding"
    >
      <!-- Add mode -->
      <div class="admp__panel" *ngIf="mode === 'add'">
        <div class="admp__title" *ngIf="showTitle">{{ addTitle }}</div>
        <ui-form-field
          class="admp__field"
          [label]="showLabels ? 'Merchant Number' : ''"
          [forId]="id + '-merchant-number'"
          [required]="true"
        >
          <ui-input
            [id]="id + '-merchant-number'"
            [(ngModel)]="merchantNo"
            placeholder="Merchant Number"
          ></ui-input>
        </ui-form-field>
        <ui-form-field
          class="admp__field"
          [label]="
            showLabels ? 'Last 5 Digits of IBAN/Bank Account Number' : ''
          "
          [forId]="id + '-last-5-digits-of-iban'"
          [required]="true"
        >
          <ui-input
            [id]="id + '-last-5-digits-of-iban'"
            [(ngModel)]="lastFiveIban"
            placeholder="Last 5 Digits of IBAN/Bank Account Number"
          ></ui-input>
        </ui-form-field>
        <ui-form-field
          class="admp__field"
          [label]="showLabels ? 'Trade License/CR Number' : ''"
          [forId]="id + '-trade-license-cr-number'"
          [required]="true"
        >
          <ui-input
            [id]="id + '-trade-license-cr-number'"
            [(ngModel)]="tradeLicense"
            placeholder="Trade License/CR Number"
          ></ui-input>
        </ui-form-field>
        <div class="admp__actions">
          <ui-button
            class="admp__btn admp__btn--back"
            variant="primary"
            label="Back"
            (click)="backClick.emit()"
          ></ui-button>
          <ui-button
            class="admp__btn admp__btn--submit"
            variant="primary"
            label="Submit"
            (click)="addClick.emit({ merchantNo, lastFiveIban, tradeLicense })"
          ></ui-button>
        </div>
      </div>

      <!-- Delete mode -->
      <div class="admp__panel" *ngIf="mode === 'delete'">
        <div class="admp__title" *ngIf="showTitle">{{ deleteTitle }}</div>

        <div class="admp__section">
          <div class="admp__section-label" *ngIf="showLabels">
            Primary Merchant Number
          </div>
          <div class="admp__section-value">
            {{ primaryMerchant?.label || primaryMerchant?.merchantNo || '-' }}
          </div>
        </div>

        <div class="admp__section">
          <div class="admp__section-label" *ngIf="showLabels">
            Other Merchant Numbers
          </div>
          <div
            class="admp__other-list"
            *ngIf="otherMerchants.length; else noOthers"
          >
            <ui-checkbox
              *ngFor="let m of otherMerchants"
              class="admp__other-item"
              [label]="m.label + ' (' + m.merchantNo + ')'"
              [(ngModel)]="selectedForDelete[m.merchantNo]"
            >
            </ui-checkbox>
          </div>
          <ng-template #noOthers>
            <div class="admp__section-value">-</div>
          </ng-template>
        </div>

        <div class="admp__actions">
          <ui-button
            class="admp__btn admp__btn--back"
            variant="primary"
            label="Back"
            (click)="backClick.emit()"
          ></ui-button>
          <ui-button
            class="admp__btn admp__btn--submit"
            variant="primary"
            label="Submit"
            [disabled]="!hasSelectionForDelete"
            (click)="onDeleteSubmit()"
          ></ui-button>
        </div>
      </div>
    </ui-accent-card>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: Arial, sans-serif;
        --input-border: 1px solid #ccc;
        --input-padding: 8px 10px;
        --input-focus-border-color: #7b1fa2;
      }
      .admp__title {
        font-size: 14px;
        font-weight: bold;
        color: #1a3a6b;
        margin-bottom: 16px;
      }
      .admp__field {
        margin-bottom: 14px;
      }
      .admp__section {
        margin-bottom: 18px;
      }
      .admp__section-label {
        font-size: 14px;
        color: #333;
        margin-bottom: 6px;
      }
      .admp__section-value {
        font-size: 13px;
        color: #555;
      }
      .admp__other-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .admp__actions {
        display: flex;
        gap: 12px;
        margin-top: 16px;
      }
      .admp__btn--back {
        --btn-bg: #1e3a5f;
        --btn-color: #fff;
        --btn-radius: 3px;
        --btn-padding: 9px 28px;
        --btn-font-size: 14px;
      }
      .admp__btn--submit {
        --btn-bg: #7b1fa2;
        --btn-color: #fff;
        --btn-radius: 3px;
        --btn-padding: 9px 28px;
        --btn-font-size: 14px;
      }
    `,
  ],
})
export class AmexAddDeleteMerchantPanelComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `add-delete-merchant-panel-${++AmexAddDeleteMerchantPanelComponent._idCounter}`;

  @Input() mode: 'add' | 'delete' = 'add';
  @Input() showTitle = false;
  @Input() showLabels = false;

  @Input() addTitle =
    'To add new Merchant Number, please enter the following details';
  @Input() deleteTitle = 'Delete an existing Merchant Account';
  @Input() merchantOptions: MerchantOption[] = [];

  @Input() cardAccentColor = '#7b1fa2';
  @Input() cardMaxWidth = '480px';
  @Input() cardPadding = '20px 24px';

  merchantNo = '';
  lastFiveIban = '';
  tradeLicense = '';
  selectedForDelete: Record<string, boolean> = {};

  @Output() addClick = new EventEmitter<{
    merchantNo: string;
    lastFiveIban: string;
    tradeLicense: string;
  }>();
  @Output() deleteClick = new EventEmitter<string[]>();
  @Output() backClick = new EventEmitter<void>();

  get primaryMerchant(): MerchantOption | undefined {
    return this.merchantOptions[0];
  }

  get otherMerchants(): MerchantOption[] {
    return this.merchantOptions.slice(1);
  }

  get hasSelectionForDelete(): boolean {
    return Object.values(this.selectedForDelete).some((v) => v);
  }

  onDeleteSubmit() {
    const selectedIds = Object.keys(this.selectedForDelete).filter(
      (id) => this.selectedForDelete[id],
    );
    this.deleteClick.emit(selectedIds);
  }
}
