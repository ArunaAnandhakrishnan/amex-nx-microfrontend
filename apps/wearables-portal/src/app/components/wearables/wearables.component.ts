import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  ButtonComponent,
  InputComponent,
  SelectComponent,
  SelectOption,
  CheckboxComponent,
  ImageComponent,
  IconButtonComponent,
  TableComponent,
  TableBodyComponent,
  TableRowComponent,
  TableCellComponent,
} from '@ui-components/ui';
import { CardInfo, IssuedDevice, IssueView, WearableStep } from '../../models/wearables.model';
import { MOCK_MEMBERS, WEARABLE_PRODUCTS, WEARABLE_TYPES } from '../../constants/wearables-mock-data.constant';
import { darkenColor, lightenColor } from '../../utils/color.util';

const API_BASE = `${environment.apiGatewayUrl}/api`;

@Component({
  selector: 'app-wearables',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    ImageComponent,
    IconButtonComponent,
    TableComponent,
    TableBodyComponent,
    TableRowComponent,
    TableCellComponent,
  ],
  templateUrl: './wearables.component.html',
  styleUrls: ['./wearables.component.css'],
})
export class WearablesComponent implements OnInit {
  @Input() showPageHeader = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.checkBackendHealth();
  }

  step: WearableStep = 'search';
  issueView: IssueView = 'select';
  backendStatus: 'checking' | 'online' | 'offline' = 'checking';
  usingMockData = false;
  clientCode = '';
  memberName = '';
  cards: CardInfo[] = [];
  selectedCard: CardInfo | null = null;
  submitting = false;
  selectedWearableType = 'Watch';
  selectedWearableIndex = 0;
  selectedColorIndex = 0;
  wearableName = 'QARR';
  tcAccepted = false;
  issuedDevice: IssuedDevice | null = null;

  wearableTypes = WEARABLE_TYPES;
  wearableProducts = WEARABLE_PRODUCTS;

  get currentProducts() {
    return this.wearableProducts[this.selectedWearableType] ?? [];
  }
  get currentProduct() {
    return this.currentProducts[this.selectedWearableIndex] ?? null;
  }

  get currentSelectedColor() {
    const p = this.currentProduct;
    if (!p) {
      return { hex: '#888', label: '', highlight: '#aaa', shadow: '#555', inner: '#666' };
    }
    const c = p.colors[this.selectedColorIndex] ?? p.colors[0];
    return {
      ...c,
      highlight: lightenColor(c.hex, 0.3),
      shadow: darkenColor(c.hex, 0.35),
      inner: darkenColor(c.hex, 0.15),
    };
  }

  private checkBackendHealth(): void {
    this.backendStatus = 'checking';
    this.http.get<any>(`${environment.apiGatewayUrl}/actuator/health`).subscribe({
      next: () => {
        this.backendStatus = 'online';
      },
      error: () => {
        this.backendStatus = 'offline';
      },
    });
  }

  onEnterClient(): void {
    if (!this.clientCode.trim()) return;
    this.http.get<any>(`${API_BASE}/wearables/client/${this.clientCode.trim()}`).subscribe({
      next: (res) => {
        this.usingMockData = false;
        this.memberName = res.data?.memberName ?? 'Unknown Member';
        this.cards = res.data?.cards ?? [];
        this.selectedCard = this.cards[0] ?? null;
        this.step = 'cards';
      },
      error: () => {
        this.usingMockData = true;
        const mock = MOCK_MEMBERS[this.clientCode.trim()];
        this.memberName = mock?.name ?? 'Unknown Member';
        this.cards = mock?.cards ?? [];
        this.selectedCard = this.cards[0] ?? null;
        this.step = 'cards';
      },
    });
  }

  onApply(): void {
    if (!this.selectedCard) return;
    this.selectedWearableType = 'Watch';
    this.selectedWearableIndex = 0;
    this.selectedColorIndex = 0;
    this.wearableName = 'QARR';
    this.tcAccepted = false;
    this.issueView = 'select';
    this.step = 'issue';
  }

  selectType(id: string): void {
    this.selectedWearableType = id;
    this.selectedWearableIndex = 0;
    this.selectedColorIndex = 0;
  }

  prevProduct(): void {
    if (this.selectedWearableIndex > 0) {
      this.selectedWearableIndex--;
      this.selectedColorIndex = 0;
    }
  }

  nextProduct(): void {
    if (this.selectedWearableIndex < this.currentProducts.length - 1) {
      this.selectedWearableIndex++;
      this.selectedColorIndex = 0;
    }
  }

  onCreateWearable(): void {
    this.tcAccepted = false;
    this.issueView = 'review';
  }

  onSubmit(): void {
    if (!this.tcAccepted || !this.currentProduct || !this.selectedCard) return;
    this.submitting = true;

    const payload = {
      clientCode: this.clientCode,
      selectedCard: this.selectedCard.cardNumber,
      wearableType: this.selectedWearableType,
      colorSelected: this.currentSelectedColor.label,
      wearableName: this.wearableName,
      tcAccepted: true,
    };

    this.http.post<any>(`${API_BASE}/wearables/issue`, payload).subscribe({
      next: (res) => {
        const d = res.data;
        this.issuedDevice = {
          selectedCardUci: this.selectedCard?.cardNumber ?? '',
          wearableUci: d?.serialNo ?? '',
          wearableType: d?.deviceType ?? '',
          colorSelected: this.currentSelectedColor.label,
          wearableName: this.wearableName,
          orderDate: d?.issueDate ?? new Date().toLocaleDateString('en-GB'),
        };
        this.submitting = false;
        this.issueView = 'success';
      },
      error: () => {
        this.issuedDevice = {
          selectedCardUci: this.selectedCard?.cardNumber ?? '',
          wearableUci: 'SN-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          wearableType: this.currentProduct?.type ?? '',
          colorSelected: this.currentSelectedColor.label,
          wearableName: this.wearableName,
          orderDate: new Date().toLocaleDateString('en-GB'),
        };
        this.submitting = false;
        this.issueView = 'success';
      },
    });
  }

  reset(): void {
    this.step = 'search';
    this.issueView = 'select';
    this.clientCode = '';
    this.memberName = '';
    this.cards = [];
    this.selectedCard = null;
    this.issuedDevice = null;
    this.tcAccepted = false;
    this.submitting = false;
    this.usingMockData = false;
    this.selectedWearableType = 'Watch';
    this.selectedWearableIndex = 0;
    this.selectedColorIndex = 0;
    this.wearableName = 'QARR';
  }

  // --- Added for ui-select adaptation (ui-select only binds string|number values,
  // the original native <select> bound the whole CardInfo object via [ngValue]) ---
  get cardSelectOptions(): SelectOption[] {
    return this.cards.map((c) => ({
      value: c.cardNumber,
      label: `${c.cardNumber} - ${c.cardType}`,
    }));
  }
  get selectedCardValue(): string {
    return this.selectedCard?.cardNumber ?? '';
  }
  set selectedCardValue(val: string) {
    this.selectedCard = this.cards.find((c) => c.cardNumber === val) ?? null;
  }

  // --- Added: ui-input has no built-in maxlength support, so enforce it here
  // instead of touching the shared primitive. Preserves the original maxlength="20". ---
  onWearableNameChange(val: string): void {
    this.wearableName = (val ?? '').slice(0, 20);
  }
}
