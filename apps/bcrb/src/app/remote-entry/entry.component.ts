import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BcrbDashboardComponent } from '../pages/dashboard/bcrb-dashboard.component';
import { BcrbReportsComponent } from '../pages/report/bcrb-reports.component';

@Component({
  selector: 'app-bcrb-entry',
  standalone: true,
  imports: [CommonModule, BcrbDashboardComponent, BcrbReportsComponent],
  templateUrl: './entry.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EntryComponent {
  showReports = false;

  onLinkChanged(linkId: string): void {
    this.showReports = linkId === 'bcrb';
  }
}
