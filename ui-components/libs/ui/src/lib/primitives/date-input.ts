import { Component, Input, forwardRef, HostBinding, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from './icon';

@Component({
  selector: 'ui-date-input',
  standalone: true,
  imports: [ReactiveFormsModule, IconComponent],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateInputComponent), multi: true }],
  template: `
    <div class="date-input-wrapper">
      <input
        #dateInput
        type="date"
        [id]="id"
        [min]="min"
        [max]="max"
        [disabled]="disabled"
        [value]="value"
        [required]="required"
        [class.invalid]="invalid"
        [class.disabled]="disabled"
        [attr.aria-invalid]="invalid ? 'true' : null"
        [attr.aria-describedby]="ariaDescribedBy || null"
        [attr.aria-required]="required"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-labelledby]="ariaLabelledBy || null"
        (input)="onInput($event)"
        (blur)="onTouched()"
        class="date-input"
      />
      <ui-icon
        glyph="📅"
        size="sm"
        [decorative]="true"
        class="date-input-icon"
        (click)="openPicker()"
      ></ui-icon>
    </div>
  `,
  styles: [`
    .date-input-wrapper { position: relative; display: inline-block; width: 100%; }
    .date-input {
      padding: 8px 32px 8px 12px;
      font-size: 14px;
      font-family: Arial, sans-serif;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      outline: none;
      transition: border-color 0.2s;
      width: 100%;
      box-sizing: border-box;
      color: #333;
      background: #fff;
    }
    .date-input:focus { border-color: #1976d2; box-shadow: 0 0 0 2px rgba(25,118,210,0.15); }
    .date-input.invalid { border-color: #f44336; }
    .date-input.invalid:focus { box-shadow: 0 0 0 2px rgba(244,67,54,0.15); }
    .date-input.disabled { background: #f5f5f5; cursor: not-allowed; color: #999; }

    /* hide native browser calendar icon so only our custom icon shows */
    .date-input::-webkit-calendar-picker-indicator {
      opacity: 0;
      position: absolute;
      right: 0;
      width: 32px;
      height: 100%;
      margin: 0;
    }
    .date-input::-webkit-clear-button,
    .date-input::-webkit-inner-spin-button {
      display: none;
    }

    .date-input-icon {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      pointer-events: auto;
    }
  `],
})
export class DateInputComponent implements ControlValueAccessor {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-date-input-${++DateInputComponent._idCounter}`;

  @ViewChild('dateInput') dateInputRef!: ElementRef<HTMLInputElement>;

  @Input() min = '';
  @Input() max = '';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() ariaLabel = '';
  @Input() ariaLabelledBy = '';
  @Input() ariaDescribedBy = '';

  value = '';
  onChange = (_: string) => {};
  onTouched = () => {};

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
  }

  openPicker() {
    if (this.disabled) return;
    const input = this.dateInputRef.nativeElement;
    if (typeof input.showPicker === 'function') {
      input.showPicker();
    } else {
      input.focus();
    }
  }

  writeValue(val: string) { this.value = val ?? ''; }
  registerOnChange(fn: (_: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
}