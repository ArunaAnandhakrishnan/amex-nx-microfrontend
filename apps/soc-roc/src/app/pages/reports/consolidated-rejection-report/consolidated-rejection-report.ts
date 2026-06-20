import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ConsolidatedRejectionRecord {
  julianDay: string;
  socRefNo: string;
  rocRefNo: string;
  salesEntity: string;
  cardNumber: string;
  amount: number;
  currency: string;
  rejectionCode: string;
  rejectionReason: string;
}

@Component({
  selector: 'app-consolidated-rejection-report',
  imports: [CommonModule, FormsModule],
  templateUrl: './consolidated-rejection-report.html',
  styleUrl: './consolidated-rejection-report.css',
})
export class ConsolidatedRejectionReport implements OnInit {
  fromJulianDay: string = '';
  toJulianDay: string = '';
  salesEntity: string = '';
  currency: string = '';

  currencyList: string[] = ['USD', 'EUR', 'GBP', 'AED', 'DZD', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR'];

  records: ConsolidatedRejectionRecord[] = [];
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  ngOnInit(): void {
    const today = new Date();
    this.fromJulianDay = this.getJulianDay(today);
    this.toJulianDay = this.fromJulianDay;
  }

  getJulianDay(date: Date): string {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)).toString();
  }

  onSearch(): void {
    if (!this.fromJulianDay.trim() || !this.toJulianDay.trim()) {
      this.status = 'error';
      this.statusMessage = 'From and To Julian Day are required.';
      return;
    }
    if (parseInt(this.fromJulianDay) > parseInt(this.toJulianDay)) {
      this.status = 'error';
      this.statusMessage = 'From Julian Day cannot be greater than To Julian Day.';
      return;
    }
    this.status = 'idle';
    this.statusMessage = '';
    // TODO: replace with ReportService API call
    this.records = [];
  }

  onClear(): void {
    const today = new Date();
    this.fromJulianDay = this.getJulianDay(today);
    this.toJulianDay = this.fromJulianDay;
    this.salesEntity = '';
    this.currency = '';
    this.records = [];
    this.status = 'idle';
    this.statusMessage = '';
  }

  onPrint(): void {
    window.print();
  }

  onExport(): void {
    // TODO: implement export
  }
}