import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    AmexVATRegistrationFormComponent,
} from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-vat-registration',
  standalone: true,
  imports: [
    CommonModule,
    AmexVATRegistrationFormComponent
  ],
  templateUrl:
    './oms-vat-registration.component.html',
})
export class OmsVatRegistrationComponent {

    @Output()
    taxInvoiceDeliveryClicked = new EventEmitter<void>();

    @Output()
    uploadCertificateClicked = new EventEmitter<void>();

    @Output()
    merchantRegistrationClicked = new EventEmitter<void>();

    @Output()
    downloadTaxInvoiceClicked = new EventEmitter<void>();

    @Output()
    backClicked = new EventEmitter<void>();

    onBack() {

    console.log(
        'Back Clicked'
    );

    this.backClicked.emit();
    }

    onStepClick(step: string) {

    console.log(
        'VAT Registration Step Clicked:',
        step
    );

    if (step === 'upload') {

      this.uploadCertificateClicked.emit();
    }

    if (step === 'merchant') {

      this.merchantRegistrationClicked.emit();
    }

    if (step === 'delivery') {

      this.taxInvoiceDeliveryClicked.emit();
    }

    if (step === 'download') {

      this.downloadTaxInvoiceClicked.emit();
    }
  }
}