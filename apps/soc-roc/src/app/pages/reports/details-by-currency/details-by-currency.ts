import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CurrencyRecord {
  currency: string;
  totalCharges: number;
  numCharges: number;
  totalRefunds: number;
  numRefunds: number;
  netAmount: number;
}

@Component({
  selector: 'app-details-by-currency',
  imports: [CommonModule, FormsModule],
  templateUrl: './details-by-currency.html',
  styleUrl: './details-by-currency.css',
})
export class DetailsByCurrency implements OnInit {
  julianDay: string = '';
  selectedDate: string = '';

  records: CurrencyRecord[] = [];
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  ngOnInit(): void {
    const today = new Date();
    this.julianDay = this.getJulianDay(today);
    this.selectedDate = today.toLocaleDateString('en-GB');
  }

  getJulianDay(date: Date): string {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)).toString();
  }

  onSearch(): void {
    if (!this.julianDay.trim()) {
      this.status = 'error';
      this.statusMessage = 'Julian Day is required.';
      return;
    }
    this.status = 'idle';
    this.statusMessage = '';
    // TODO: replace with ReportService API call
    this.records = [];
  }

  onClear(): void {
    this.julianDay = '';
    this.selectedDate = '';
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