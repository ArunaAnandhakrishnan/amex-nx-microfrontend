import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Utility } from '../../../../core/services/utility';

@Component({
  selector: 'app-extract-rejected-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './extract-rejected-items.html',
  styleUrls: ['./extract-rejected-items.css']
})
export class ExtractRejectedItems implements OnInit {

  julianDay = '';
  selectedDate: Date = new Date();
  currentMonth: Date = new Date();
  calendarDays: { date: Date; currentMonth: boolean }[] = [];
  calendarMonthYear = '';

  seNumber = '';
  seNumbers: string[] = [];
  selectedIndex: number | null = null;

  includeSocHeader = true;

  isLoading = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage = '';

  constructor(private utilityService: Utility) {}

  ngOnInit(): void {
    this.setToday();
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
      const date = new Date(new Date().getFullYear(), 0);
      date.setDate(day);
      this.selectedDate = date;
      this.currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      this.buildCalendar(this.currentMonth);
    }
  }

  getJulianDay(date: Date): string {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)).toString();
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
    for (let d = 1; d <= 42 - days.length; d++) {
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

  addSeNumber(): void {
    const value = this.seNumber.trim();
    if (!value) return;
    if (!this.seNumbers.includes(value)) {
      this.seNumbers.push(value);
    }
    this.seNumber = '';
  }

  removeSelected(): void {
    if (this.selectedIndex !== null) {
      this.seNumbers.splice(this.selectedIndex, 1);
      this.selectedIndex = null;
    }
  }

  onExtractRejectedItems(): void {
    if (!this.julianDay) {
      this.showStatus('error', 'Please enter Julian Day or select a capture date.');
      return;
    }
    if (this.seNumbers.length === 0) {
      this.showStatus('error', 'Please add at least one SE Number.');
      return;
    }

    this.isLoading = true;
    this.status = 'idle';

    const dateStr = this.selectedDate.toISOString().split('T')[0];

    this.utilityService.extractRejectedItems(
      dateStr,
      this.julianDay,
      this.seNumbers,
      this.includeSocHeader
    ).subscribe({
      next: () => {
        this.isLoading = false;
        this.showStatus('success', 'Rejected items extracted successfully.');
      },
      error: () => {
        this.isLoading = false;
        this.showStatus('error', 'Extraction failed. Please try again.');
      }
    });
  }

  private showStatus(type: 'success' | 'error', message: string): void {
    this.status = type;
    this.statusMessage = message;
  }
}