import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchCardUserComponent } from '../pages/search-card-user/search-card-user.component';

@Component({
  selector: 'app-online-account-entry',
  standalone: true,
  imports: [CommonModule, SearchCardUserComponent],
  templateUrl: './entry.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EntryComponent {}
