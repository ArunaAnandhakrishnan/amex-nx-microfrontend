import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-register.html',
  styleUrl: './payment-register.css',
})
export class PaymentRegister implements OnInit {
  julianDay: string = '';
  year: string = '';
  country: string = '';
  currency: string = '';
  referenceNumber: string = '';

  yearList: string[] = [];
  countryList: string[] = ['ALGERIA', 'UAE', 'KSA', 'QATAR', 'KUWAIT', 'BAHRAIN', 'OMAN'];
  currencyList: string[] = ['DZD', 'USD', 'EUR', 'GBP', 'AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR'];

  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= currentYear - 10; y--) {
      this.yearList.push(y.toString());
    }
    this.year = currentYear.toString();
    this.julianDay = this.getJulianDay(new Date());
  }

  getJulianDay(date: Date): string {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)).toString();
  }

  onPaymentTab(): void {
    this.router.navigate(['algeria-payment']);
  }

  onViewReport(): void {
    this.status = 'idle';
    this.statusMessage = '';
    // TODO: replace with PaymentRegisterService API call
  }
}