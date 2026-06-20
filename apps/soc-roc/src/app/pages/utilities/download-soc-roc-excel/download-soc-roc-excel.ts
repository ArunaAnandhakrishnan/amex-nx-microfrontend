import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-download-soc-roc-excel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './download-soc-roc-excel.html',
  styleUrl: './download-soc-roc-excel.css',
})
export class DownloadSocRocExcel {
  selectedFile: File | null = null;
  fileName: string = '';
  tableData: any[] = [];
  tableHeaders: string[] = [];

  isRefreshing: boolean = false;
  isUploading: boolean = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
      this.tableData = [];
      this.tableHeaders = [];
      this.status = 'idle';
    }
  }

  onRefreshData(): void {
    if (!this.selectedFile) {
      this.showStatus('error', 'Please upload an Excel file first.');
      return;
    }
    this.isRefreshing = true;
    this.status = 'idle';
    // Simulate reading XL data
    setTimeout(() => {
      this.tableHeaders = ['SE Number', 'SOC Reference', 'ROC Reference', 'Amount', 'Currency', 'Date'];
      this.tableData = [
        { 'SE Number': '100001', 'SOC Reference': 'SOC-001', 'ROC Reference': 'ROC-001', 'Amount': '1500.00', 'Currency': 'USD', 'Date': '2024-09-26' },
        { 'SE Number': '100002', 'SOC Reference': 'SOC-002', 'ROC Reference': 'ROC-002', 'Amount': '2300.00', 'Currency': 'AED', 'Date': '2024-09-26' },
      ];
      this.isRefreshing = false;
      this.showStatus('success', 'Data refreshed from Excel successfully.');
    }, 600);
  }

  onUploadToServer(): void {
    if (!this.selectedFile) {
      this.showStatus('error', 'Please upload an Excel file first.');
      return;
    }
    if (this.tableData.length === 0) {
      this.showStatus('error', 'Please refresh data from Excel before uploading.');
      return;
    }
    this.isUploading = true;
    this.status = 'idle';
    // API call placeholder
    setTimeout(() => {
      this.isUploading = false;
      this.showStatus('success', 'Data uploaded to server successfully.');
    }, 700);
  }

  private showStatus(type: 'success' | 'error', message: string): void {
    this.status = type;
    this.statusMessage = message;
  }
}