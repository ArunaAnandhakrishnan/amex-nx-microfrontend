import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FieldConfig {
  label: string;
  value: string;
  enabled: boolean;
  type?: string;
  options?: string[];
}

interface DateFilterConfig {
  label: string;
  value: string;
  enabled: boolean;
  placeholder?: string;
}

interface RetrievalRecord {
  julianDay: string;
  batchNo: string;
  socRefNo: string;
  country: string;
  currency: string;
  seNo: string;
  cardNo: string;
  rocRef: string;
  date: string;
  amount: number;
}

@Component({
  selector: 'app-retrieval',
  imports: [CommonModule, FormsModule],
  templateUrl: './retrieval.html',
  styleUrl: './retrieval.css',
})
export class Retrieval {
  selectedType: 'ROC' | 'SOC' = 'ROC';

  rocFields: FieldConfig[] = [
    { label: 'ROC Ref. No.', value: '', enabled: true, type: 'text' },
    { label: 'ROC Amount',   value: '', enabled: true, type: 'text' },
    { label: 'Card No.',     value: '', enabled: true, type: 'text' },
    { label: 'SE No.',       value: '', enabled: true, type: 'text' },
    { label: 'Currency',     value: 'US DOLLAR', enabled: true, type: 'select',
      options: ['US DOLLAR', 'EURO', 'GBP', 'AED', 'SAR', 'QAR', 'KWD', 'BHD', 'DZD'] },
    { label: 'Country',      value: 'US', enabled: true, type: 'select',
      options: ['US', 'UAE', 'KSA', 'QATAR', 'KUWAIT', 'BAHRAIN', 'OMAN', 'ALGERIA'] },
  ];

  socFields: FieldConfig[] = [
    { label: 'SOC Ref. No.', value: '', enabled: true },
    { label: 'SOC Amount',   value: '', enabled: true },
  ];

  dateFilters: DateFilterConfig[] = [
    { label: 'From Julian Day', value: '', enabled: false },
    { label: 'To Julian Day',   value: '', enabled: false },
    { label: 'From Date',       value: '', enabled: false, placeholder: 'DD/MM/YYYY' },
    { label: 'To Date',         value: '', enabled: false, placeholder: 'DD/MM/YYYY' },
  ];

  showModal: boolean = false;
  reportRecords: RetrievalRecord[] = [];

  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  onRetrieve(): void {
    this.status = 'idle';
    this.statusMessage = '';
    // TODO: replace with ReportService API call using enabled field values
    this.reportRecords = [];
    this.showModal = true;
  }

  onPrint(): void {
    this.showModal = true;
  }

  onPrintReport(): void {
    window.print();
  }

  onCancel(): void {
    this.showModal = false;
  }
}