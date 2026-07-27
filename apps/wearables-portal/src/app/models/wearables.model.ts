export type WearableStep = 'search' | 'cards' | 'issue' | 'done';
export type IssueView = 'select' | 'review' | 'success';

export interface CardInfo {
  cardNumber: string;
  cardType: string;
  status: string;
}

export interface WearableColor {
  hex: string;
  label: string;
}

export interface WearableProduct {
  name: string;
  type: string;
  colors: WearableColor[];
  icon: string;
}

export interface WearableTypeOption {
  id: string;
  label: string;
  svg: string;
}

export interface MockMember {
  name: string;
  cards: CardInfo[];
}

export interface IssuedDevice {
  selectedCardUci: string;
  wearableUci: string;
  wearableType: string;
  colorSelected: string;
  wearableName: string;
  orderDate: string;
}
