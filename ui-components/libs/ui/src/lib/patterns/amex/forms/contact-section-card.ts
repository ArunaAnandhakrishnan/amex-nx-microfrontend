import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccentCardComponent } from '../../../composite/amex/accent-card';
import { InputComponent } from '../../../primitives/input';
import { SelectComponent, SelectOption } from '../../../primitives/select';

export interface ContactRow {
  name: string;
  jobTitle: string;
  email: string;
  countryCode: string;
  landline: string;
  mobile: string;
}

/**
 * ContactSectionCard
 * One reusable section card (Marketing / Finance / Operations) used inside
 * the Add/Edit Contact Information form. Title renders above the card
 * (unbordered), then a ui-accent-card holds 3 repeated contact rows
 * (Name, Job Title, Email/Country/Landline/Mobile).
 * This ONE component is what contact-information-form.ts loops over via
 * [sections] to render all 3 sections - same component type reused 3x
 * with different [title]/[contacts] inputs, not 3 separate templates.
 * Source: OMS (image1/2/3)
 */
@Component({
  selector: 'amex-contact-section-card',
  standalone: true,
  imports: [CommonModule, FormsModule, AccentCardComponent, InputComponent, SelectComponent],
  template: `
    <div class="csc__title">{{ title }}</div>
    <ui-accent-card class="csc__card" [accentColor]="accentColor" maxWidth="100%" padding="20px 24px">
      <div *ngFor="let contact of contacts; let i = index" class="csc__contact-row">
        <ui-input class="csc__input csc__input--full"
          [id]="id + '-contact-' + i + '-name'"
          [(ngModel)]="contact.name"
          ariaLabel="Name"
          placeholder="Name">
        </ui-input>
        <ui-input class="csc__input csc__input--full" style="margin-top:6px"
          [id]="id + '-contact-' + i + '-job-title'"
          [(ngModel)]="contact.jobTitle"
          ariaLabel="Job Title"
          placeholder="Job Title">
        </ui-input>
        <div class="csc__contact-bottom">
          <ui-input class="csc__input csc__input--email"
            [id]="id + '-contact-' + i + '-email'"
            [(ngModel)]="contact.email"
            [ariaLabel]="'Email ' + (i + 1)"
            [placeholder]="'Email ' + (i + 1)">
          </ui-input>
          <ui-select class="csc__select csc__select--country"
            [id]="id + '-contact-' + i + '-country-code'"
            [options]="countrySelectOptions"
            placeholder="--"
            ariaLabel="Country code"
            [(ngModel)]="contact.countryCode">
          </ui-select>
          <ui-input class="csc__input csc__input--phone"
            [id]="id + '-contact-' + i + '-landline'"
            [(ngModel)]="contact.landline"
            ariaLabel="Landline"
            placeholder="Landline">
          </ui-input>
          <ui-input class="csc__input csc__input--phone"
            [id]="id + '-contact-' + i + '-mobile'"
            [(ngModel)]="contact.mobile"
            ariaLabel="Mobile"
            placeholder="Mobile">
          </ui-input>
        </div>
      </div>
    </ui-accent-card>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      margin-bottom: 24px;
      --input-border: 1px solid #ccc;
      --input-radius: 3px;
      --input-padding: 7px 10px;
      --input-focus-border-color: #7b1fa2;
    }
    .csc__title {
      font-size: 15px;
      font-weight: bold;
      color: #1a3a6b;
      padding: 0 0 8px;
    }
    .csc__contact-row {
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }
    .csc__contact-row:last-of-type { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }

    .csc__input--full { width: 100%; display: block; }
    .csc__input--email { flex: 2; min-width: 0; }
    .csc__input--phone { flex: 1.2; min-width: 0; }

    .csc__contact-bottom {
      display: flex; gap: 8px; margin-top: 6px; flex-wrap: wrap;
      align-items: flex-start;
    }

    .csc__select--country { flex: 1; min-width: 100px; }
  `],
})
export class ContactSectionCardComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `contact-section-card-${++ContactSectionCardComponent._idCounter}`;

  @Input() title = '';
  @Input() accentColor = '#7b1f4b';
  @Input() contacts: ContactRow[] = [];
  @Input() countryCodes: { value: string; label: string }[] = [
    { value: '+971', label: 'UAE (+971)' },
    { value: '+973', label: 'Bahrain (+973)' },
    { value: '+965', label: 'Kuwait (+965)' },
    { value: '+968', label: 'Oman (+968)' },
    { value: '+974', label: 'Qatar (+974)' },
    { value: '+966', label: 'Saudi (+966)' },
  ];

  get countrySelectOptions(): SelectOption[] {
    return this.countryCodes.map(c => ({ value: c.value, label: c.label }));
  }
}