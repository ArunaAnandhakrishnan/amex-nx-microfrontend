import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Utility } from '../../../../core/services/utility';

@Component({
  selector: 'app-file-formation-upload',
  imports: [CommonModule, FormsModule],
  templateUrl: './file-formation-upload.html',
  styleUrl: './file-formation-upload.css',
})
export class FileFormationUpload implements OnInit {
  julianDay: string = '';
  selectedDate: Date = new Date();
  country: string = '';
  currency: string = '';

  countries: string[] = [
  'INDIA',
  'EUROPE',
  'US',
  'BAHRAIN',
  'UNITED ARAB EMIRATES',
  'KUWAIT',
  'SOMALIA',
  'LIBYA',
  'EGYPT',
  'LEBANON',
  'OMAN',
  'QATAR',
  'SAUDI ARABIA',
  'JORDAN'
];
  currencies: string[] = [
  'SOMALI SHILLING',
  'BAHRAIN DINAR',
  'UAE DIRHAM',
  'LIBYAN DINAR',
  'EGYPTIAN POUND',
  'US DOLLAR',
  'KUWAITI DINAR',
  'OMANI RIYAL',
  'QATARI RIAL',
  'SAUDI RIYAL',
  'JORDANIAN DINAR',
  'ALGERIAN DINAR',
  'MOROCCAN DIRHAM',
  'TUNISIAN DINAR',
  'OUGUIJA',
  'SUDANESE DINAR',
  'SMT DINAR',
  'INDIAN RUPEE'
];

  calendarDays: { date: Date; currentMonth: boolean }[] = [];
  calendarMonthYear: string = '';
  currentMonth: Date = new Date();

  isLoading: boolean = false;
  uploadStatus: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  constructor(private utilityService: Utility) {}

  ngOnInit(): void {
    this.setToday();
    this.buildCalendar(this.currentMonth);
  }

  setToday(): void {
    const today = new Date();
    this.selectedDate = today;
    this.currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.julianDay = this.getJulianDay(today);
    this.buildCalendar(this.currentMonth);
  }

  onJulianDayInput(): void {
    const day = parseInt(this.julianDay, 10);
    if (!isNaN(day) && day >= 1 && day <= 366) {
      const year = new Date().getFullYear();
      const date = new Date(year, 0);
      date.setDate(day);
      this.selectedDate = date;
      this.currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      this.buildCalendar(this.currentMonth);
    }
  }

  getJulianDay(date: Date): string {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay).toString();
  }

  buildCalendar(monthStart: Date): void {
    const year = monthStart.getFullYear();
    const month = monthStart.getMonth();
    this.calendarMonthYear = monthStart.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: { date: Date; currentMonth: boolean }[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month - 1, daysInPrevMonth - i), currentMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ date: new Date(year, month, d), currentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push({ date: new Date(year, month + 1, d), currentMonth: false });
    }

    this.calendarDays = days;
  }

  prevMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.buildCalendar(this.currentMonth);
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.buildCalendar(this.currentMonth);
  }

  selectDate(day: { date: Date; currentMonth: boolean }): void {
    this.selectedDate = day.date;
    this.julianDay = this.getJulianDay(day.date);
    if (!day.currentMonth) {
      this.currentMonth = new Date(day.date.getFullYear(), day.date.getMonth(), 1);
      this.buildCalendar(this.currentMonth);
    }
  }

  isSelected(date: Date): boolean {
    return date.toDateString() === this.selectedDate.toDateString();
  }

  isToday(date: Date): boolean {
    return date.toDateString() === new Date().toDateString();
  }

  onDoFileFormation(): void {
    if (!this.country || !this.currency) {
      this.showStatus('error', 'Please select Country and Currency.');
      return;
    }
    this.isLoading = true;
    this.uploadStatus = 'idle';

    const dateStr = this.selectedDate.toISOString().split('T')[0];
    this.utilityService.formFile(dateStr, this.julianDay).subscribe({
      next: () => {
        this.isLoading = false;
        this.showStatus('success', 'File formation completed successfully.');
      },
      error: () => {
        this.isLoading = false;
        this.showStatus('error', 'File formation failed. Please try again.');
      },
    });
  }

  private showStatus(type: 'success' | 'error', message: string): void {
    this.uploadStatus = type;
    this.statusMessage = message;
  }
}