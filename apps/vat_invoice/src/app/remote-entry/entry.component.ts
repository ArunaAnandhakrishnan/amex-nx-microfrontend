import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VatReportViewComponent } from '../pages/vat-report-view/vat-report-view.component';
import { VatInvoiceDetailsComponent } from '../pages/vat-invoice-details/vat-invoice-details.component';
import { VatInvoiceMockService } from '../services/vat-invoice-mock.service';

@Component({
  selector: 'app-vat-invoice-entry',
  standalone: true,
  imports: [CommonModule, VatReportViewComponent, VatInvoiceDetailsComponent],
  templateUrl: './entry.component.html',
  styles: [`
    .vat-invoice-content {
      width: 100%;
      padding: 16px;
    }
    vat-report-view {
      display: block;
      width: 100%;
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class EntryComponent {
  showInvoiceDetails = false;

  constructor(private vatInvoiceService: VatInvoiceMockService) {}

  onGenerateReport(invoiceNumber: string) {
    console.log('Invoice Number:', invoiceNumber);
    this.vatInvoiceService.generateInvoiceReport(invoiceNumber);
    this.showInvoiceDetails = true;
  }
}
