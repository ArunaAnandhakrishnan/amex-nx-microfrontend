import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-accent-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="accent-card" [style.width]="width" [style.maxWidth]="maxWidth">
      <div
        class="accent-bar"
        [style.background]="accentColor"
        [style.height.px]="accentHeight"
      ></div>
      <div
        class="accent-card-body"
        [style.padding]="padding"
        [style.background]="background"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      .accent-card {
        display: flex;
        flex-direction: column;
        border: 1px solid #e0e0e0;
        overflow: hidden;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
      }
      .accent-bar {
        width: 100%;
        flex-shrink: 0;
      }
      .accent-card-body {
        flex: 1;
        box-sizing: border-box;
      }
    `,
  ],
})
export class AccentCardComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-accent-card-${++AccentCardComponent._idCounter}`;

  @HostBinding('style.maxWidth') get hostMaxWidth() {
    return this.maxWidth;
  }

  @Input() accentColor = '#7b1f4b';
  @Input() accentHeight = 4;
  @Input() background = '#ffffff';
  @Input() padding = '24px 20px';
  @Input() width = '100%';
  @Input() maxWidth = '360px';
}
