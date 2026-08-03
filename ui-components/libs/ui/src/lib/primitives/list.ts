import { Component, Input, HostBinding } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'ui-list',
  standalone: true,
  imports: [NgIf, NgTemplateOutlet],
  template: `
    <ng-template #content><ng-content></ng-content></ng-template>

    <ul
      *ngIf="!ordered"
      [id]="id"
      class="ui-list"
      [class.ui-list--compact]="compact"
      [class.ui-list--unstyled]="unstyled"
      [attr.aria-label]="ariaLabel || null"
    >
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </ul>
    <ol
      *ngIf="ordered"
      [id]="id"
      class="ui-list"
      [class.ui-list--compact]="compact"
      [class.ui-list--unstyled]="unstyled"
      [attr.aria-label]="ariaLabel || null"
    >
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </ol>
  `,
  styles: [
    `
      .ui-list {
        margin: 0;
        padding-left: var(--list-indent, 20px);
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #333;
      }
      .ui-list--compact {
        padding-left: var(--list-indent, 16px);
      }
      .ui-list--unstyled {
        list-style: none;
        padding-left: 0;
      }
    `,
  ],
})
export class ListComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-list-${++ListComponent._idCounter}`;

  @Input() ordered = false;
  @Input() unstyled = false;
  @Input() compact = false;
  @Input() ariaLabel = '';
}
