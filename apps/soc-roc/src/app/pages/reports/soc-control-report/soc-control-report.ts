import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SocControlRecord {
  socRefNo: string;
  salesEntity: string;
  julianDay: string;
  totalCharges: number;
  numCharges: number;
  totalRefunds: number;
  numRefunds: number;
  status: string;
}

@Component({
  selector: 'app-soc-control-report',
  imports: [CommonModule, FormsModule],
  templateUrl: './soc-control-report.html',
  styleUrl: './soc-control-report.css',
})
export class SocControlReport implements OnInit {
  julianDay: string = '';
  selectedDate: string = '';
  salesEntity: string = '';

  records: SocControlRecord[] = [];
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
    this.salesEntity = '';
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