import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccentCardComponent } from '../../../composite/amex/accent-card';
import { InputComponent } from '../../../primitives/input';
import { ButtonComponent } from '../../../primitives/button';
import {
  ContactSectionCardComponent,
  ContactRow,
} from './contact-section-card';

export type { ContactRow } from './contact-section-card';

export interface ContactSection {
  title: string;
  contacts: ContactRow[];
}
@Component({
  selector: 'amex-contact-information-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AccentCardComponent,
    InputComponent,
    ButtonComponent,
    ContactSectionCardComponent,
  ],
  template: `
    <ui-accent-card
      class="cif__outer"
      [accentColor]="accentColor"
      maxWidth="120%"
      padding="24px 28px"
      background="#fbfbfb"
    >
      <div class="cif__error" *ngIf="errorMessage">{{ errorMessage }}</div>

      <div class="cif__top-fields">
        <ui-input
          class="cif__input"
          [id]="id + '-contact-name'"
          [(ngModel)]="contactName"
          ariaLabel="Contact Name"
          placeholder="Contact Name"
        >
        </ui-input>
        <ui-input
          class="cif__input"
          [id]="id + '-website-url'"
          [(ngModel)]="websiteUrl"
          ariaLabel="Website URL"
          placeholder="Website URL"
        >
        </ui-input>
        <ui-input
          class="cif__input"
          [id]="id + '-oms-email'"
          [(ngModel)]="omsEmail"
          ariaLabel="OMS Email Address"
          placeholder="OMS Email Address"
        >
        </ui-input>
      </div>

      <amex-contact-section-card
        *ngFor="let section of sections"
        [title]="section.title"
        [contacts]="section.contacts"
        [countryCodes]="countryCodes"
        [accentColor]="accentColor"
      >
      </amex-contact-section-card>

      <div class="cif__actions">
        <ui-button
          class="cif__btn cif__btn--back"
          variant="primary"
          [label]="backLabel"
          (click)="backClick.emit()"
        ></ui-button>
        <ui-button
          class="cif__btn cif__btn--save"
          variant="primary"
          [label]="saveLabel"
          (click)="onSave()"
        ></ui-button>
      </div>
    </ui-accent-card>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: Arial, sans-serif;
        --input-border: 1px solid #ccc;
        --input-radius: 3px;
        --input-padding: 8px 12px;
        --input-focus-border-color: #7b1fa2;
      }

      .cif__error {
        color: #c0392b;
        font-size: 13px;
        margin-bottom: 16px;
      }

      .cif__top-fields {
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 3px;
        padding: 16px 18px;
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .cif__input {
        width: 100%;
        display: block;
      }

      .cif__actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 8px;
      }
      .cif__btn--back {
        --btn-bg: #1e3a5f;
        --btn-color: #fff;
        --btn-radius: 3px;
        --btn-padding: 9px 28px;
        --btn-font-size: 14px;
      }
      .cif__btn--save {
        --btn-bg: #7b1fa2;
        --btn-color: #fff;
        --btn-radius: 3px;
        --btn-padding: 9px 28px;
        --btn-font-size: 14px;
      }
    `,
  ],
})
export class AmexContactInformationFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `contact-information-form-${++AmexContactInformationFormComponent._idCounter}`;

  @Input() accentColor = '#7b1f4b';
  @Input() errorMessage =
    'Some unexpected error has occurred. We are sorry for the inconvenience. Please try again after sometime.';
  @Input() contactName = '';
  @Input() websiteUrl = '';
  @Input() omsEmail = '';
  @Input() backLabel = 'Back';
  @Input() saveLabel = 'Save';

  @Input() sections: ContactSection[] = [
    { title: 'Marketing', contacts: [] },
    { title: 'Finance', contacts: [] },
    { title: 'Operations', contacts: [] },
  ];

  @Input() countryCodes: { value: string; label: string }[] = [
    { value: '+971', label: 'UAE (+971)' },
    { value: '+973', label: 'Bahrain (+973)' },
    { value: '+965', label: 'Kuwait (+965)' },
    { value: '+968', label: 'Oman (+968)' },
    { value: '+974', label: 'Qatar (+974)' },
    { value: '+966', label: 'Saudi (+966)' },
  ];

  @Output() saveClick = new EventEmitter<{
    contactName: string;
    websiteUrl: string;
    omsEmail: string;
    sections: ContactSection[];
  }>();
  @Output() backClick = new EventEmitter<void>();

  onSave() {
    this.saveClick.emit({
      contactName: this.contactName,
      websiteUrl: this.websiteUrl,
      omsEmail: this.omsEmail,
      sections: this.sections,
    });
  }
}
