import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="panel">
      <div class="panel-band" *ngIf="title">{{ title }}</div>
      <div class="panel-band-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .panel { display: block; font-family: Arial, sans-serif; }
    .panel-band {
      background: var(--panel-band-bg, #b8d8f0);
      padding: 8px 14px;
      font-size: var(--panel-title-size, 13px);
      font-weight: bold;
      color: var(--panel-title-color, #1a3a6b);
      border: 1px solid var(--panel-band-border, #a0c0d8);
      border-bottom: none;
    }
    .panel-band-body {
      border: 1px solid var(--panel-band-border, #b0cce0);
      background: #fff;
      padding: var(--panel-padding, 16px 20px);
      max-width: var(--panel-max-width, none);
    }
  `],
})
export class PanelComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-panel-${++PanelComponent._idCounter}`;

  @Input() title = '';
}