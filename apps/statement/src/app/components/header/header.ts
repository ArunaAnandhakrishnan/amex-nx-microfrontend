import { Component } from '@angular/core';
import { AmexPageHeaderComponent } from '@ui-components/ui';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AmexPageHeaderComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
