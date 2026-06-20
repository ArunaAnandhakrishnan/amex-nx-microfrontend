import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-algeria-payment',
  imports: [CommonModule, FormsModule],
  templateUrl: './algeria-payment.html',
  styleUrl: './algeria-payment.css',
})
export class AlgeriaPayment implements OnInit {
  julianDay: string = '';
  year: string = '';
  exchangeRate: string = '1';
  referenceNo: string = '1';
  seType: string = '';

  yearList: string[] = [];

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

  onViewReportTab(): void {
    this.router.navigate(['payment-register']);
  }

  onViewReport(): void {
    if (!this.julianDay.trim()) {
      this.status = 'error';
      this.statusMessage = 'Julian Day is required.';
      return;
    }
    if (!this.seType.trim()) {
      this.status = 'error';
      this.statusMessage = 'SE Type is required.';
      return;
    }
    this.status = 'idle';
    this.statusMessage = '';
    // TODO: replace with AlgeriaPaymentService API call
  }
}