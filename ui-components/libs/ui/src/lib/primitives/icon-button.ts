import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { ButtonComponent } from './button';
import { IconComponent } from './icon';

@Component({
  selector: 'ui-icon-button',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  template: `
    <ui-button
      class="icon-btn-{{ variant }} icon-btn-{{ size }}"
      type="button"
      label=""
      [ariaLabel]="ariaLabel || ariaLabelFallback"
      [ariaDescribedBy]="ariaDescribedBy"
      [ariaPressed]="ariaPressed"
      [ariaExpanded]="ariaExpanded"
      [ariaSelected]="ariaSelected"
      [ariaControls]="ariaControls"
      [role]="role"
      [tabIndexOverride]="tabIndexOverride"
      [disabled]="disabled"
      (click)="clicked.emit()"
    >
      <ui-icon
        slot="icon-start"
        [glyph]="icon"
        size="sm"
        [decorative]="true"
      ></ui-icon>
    </ui-button>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .icon-btn-sm {
        --btn-width: 28px;
        --btn-padding: 0;
        --btn-gap: 0;
      }
      .icon-btn-md {
        --btn-width: 36px;
        --btn-padding: 0;
        --btn-gap: 0;
      }
      .icon-btn-lg {
        --btn-width: 48px;
        --btn-padding: 0;
        --btn-gap: 0;
      }

      .icon-btn-sm ::ng-deep .btn,
      .icon-btn-md ::ng-deep .btn,
      .icon-btn-lg ::ng-deep .btn {
        height: var(--btn-width);
        border-radius: 50%;
        justify-content: center;
      }
      .icon-btn-sm ::ng-deep .btn-label,
      .icon-btn-md ::ng-deep .btn-label,
      .icon-btn-lg ::ng-deep .btn-label {
        display: none;
      }

      :host(.variant-primary) {
        --btn-bg: #1976d2;
        --btn-color: #fff;
        --btn-bg-hover: #1565c0;
      }
      :host(.variant-ghost) {
        --btn-bg: transparent;
        --btn-color: #555;
        --btn-bg-hover: #f0f0f0;
      }
      :host(.variant-danger) {
        --btn-bg: #f44336;
        --btn-color: #fff;
        --btn-bg-hover: #d32f2f;
      }
    `,
  ],
})
export class IconButtonComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-icon-button-${++IconButtonComponent._idCounter}`;
  @HostBinding('class') get variantClass() {
    return `variant-${this.variant}`;
  }

  @Input() icon = '★';
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Input() ariaPressed: boolean | null = null;
  @Input() ariaExpanded: boolean | null = null;
  @Input() variant: 'primary' | 'ghost' | 'danger' = 'ghost';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() role: string | null = null;
  @Input() ariaSelected: boolean | null = null;
  @Input() ariaControls = '';
  @Input() tabIndexOverride: number | null = null;
  @Output() clicked = new EventEmitter<void>();

  get ariaLabelFallback(): string {
    const iconLabels: { [key: string]: string } = {
      '★': 'Star',
      '✕': 'Close',
      '✓': 'Check',
      '✗': 'Cross',
      '❤': 'Heart',
      '➕': 'Add',
      '➖': 'Remove',
      '✏': 'Edit',
      '🔍': 'Search',
      '⚙': 'Settings',
    };
    return iconLabels[this.icon] || 'Icon button';
  }
}
