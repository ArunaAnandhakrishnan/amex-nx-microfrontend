import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button';

@Component({
  selector: 'ui-file-input',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="file-input-wrapper">
      <ui-button
        label="Choose file{{ multiple ? 's' : '' }}"
        variant="ghost"
        size="md"
        [disabled]="disabled"
        [ariaDescribedBy]="ariaDescribedBy"
        (click)="click()"
      ></ui-button>
      <span class="file-input-filename">{{
        fileNames || 'No file chosen'
      }}</span>

      <input
        #nativeInput
        type="file"
        [id]="id"
        [accept]="accept"
        [multiple]="multiple"
        [disabled]="disabled"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-describedby]="ariaDescribedBy || null"
        (change)="onChange($event)"
        class="file-input"
      />
    </div>
  `,
  styles: [
    `
      .file-input-wrapper {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-family: Arial, sans-serif;
      }
      .file-input-filename {
        font-size: 14px;
        color: #555;
      }
      .file-input {
        display: none;
      }
    `,
  ],
})
export class FileInputComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-file-input-${++FileInputComponent._idCounter}`;

  @Input() accept = '';
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Output() filesSelected = new EventEmitter<FileList>();

  @ViewChild('nativeInput', { static: true })
  private nativeInput!: ElementRef<HTMLInputElement>;

  fileNames = '';

  click(): void {
    if (!this.disabled) this.nativeInput.nativeElement.click();
  }

  focus(): void {
    this.nativeInput.nativeElement.focus();
  }

  onChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.fileNames = Array.from(files)
        .map((f) => f.name)
        .join(', ');
      this.filesSelected.emit(files);
    }
  }
}
