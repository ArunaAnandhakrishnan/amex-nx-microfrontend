import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../form-field';
import { InputComponent } from '../../../primitives/input';
import { ButtonComponent } from '../../../primitives/button';

@Component({
  selector: 'amex-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormFieldComponent,
    InputComponent,
    ButtonComponent,
  ],
  template: `
    <div class="search-wrap">
      <div class="search-row">
        <ui-form-field
          class="search-field"
          [label]="label"
          [forId]="id + '-field'"
        >
          <ui-input
            [id]="id + '-field'"
            type="text"
            [placeholder]="placeholder"
            [ariaLabel]="label"
            [(ngModel)]="value"
            (ngModelChange)="onModelChange($event)"
            (keyup.enter)="onSubmit()"
          >
          </ui-input>
        </ui-form-field>
        <ui-button
          class="search-btn"
          variant="primary"
          size="sm"
          [label]="buttonLabel"
          [disabled]="!value.trim()"
          (click)="onSubmit()"
        >
        </ui-button>
        <ui-button
          *ngIf="value"
          class="search-clear"
          variant="ghost"
          size="sm"
          label="Clear"
          (click)="onClear()"
        >
        </ui-button>
      </div>
      <div *ngIf="errorMessage" class="search-error">{{ errorMessage }}</div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: Arial, sans-serif;
        --input-border: 1px solid #bbb;
        --input-radius: 2px;
        --input-padding: 4px 8px;
        --btn-bg: linear-gradient(to bottom, #2a84e0, #1462b8);
        --btn-color: #fff;
        --btn-border: 1px solid #1050a0;
        --btn-radius: 2px;
        --btn-padding: 4px 14px;
        --btn-font-size: 12px;
      }

      .search-wrap {
        padding: 10px 0;
      }

      .search-row {
        display: flex;
        align-items: flex-end;
        gap: 6px;
        flex-wrap: wrap;
      }

      .search-field {
        width: 220px;
      }

      .search-clear {
        --btn-bg: none;
        --btn-color: #555;
        --btn-border: 1px solid #bbb;
      }

      .search-error {
        margin-top: 4px;
        font-size: 12px;
        color: #c00;
        font-family: Arial, sans-serif;
      }
    `,
  ],
})
export class AmexSearchBarComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `search-bar-${++AmexSearchBarComponent._idCounter}`;

 @Input() label = 'Search';
 @Input() placeholder = '';
 @Input() buttonLabel = 'Submit';
 @Input() errorMessage = '';

  @Output() search = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  value = '';

  onModelChange(v: string) {
    this.value = v;
  }

  onSubmit() {
    if (this.value.trim()) {
      this.search.emit(this.value.trim());
    }
  }

  onClear() {
    this.value = '';
    this.cleared.emit();
  }
}
