import { MockMember, WearableProduct, WearableTypeOption } from '../models/wearables.model';

/**
 * Fallback demo data used when the API Gateway is unreachable.
 * Preserved exactly from the original component (business/demo requirement).
 */
export const MOCK_MEMBERS: Record<string, MockMember> = {
  '12345': {
    name: 'John Doe',
    cards: [
      { cardNumber: '3744 XXXXXX 9008', cardType: 'Centurion', status: 'Active' },
      { cardNumber: '3782 XXXXXX 0005', cardType: 'Platinum', status: 'Active' },
      { cardNumber: '3711 XXXXXX 1234', cardType: 'Gold', status: 'Inactive' },
    ],
  },
  '67890': {
    name: 'Jane Smith',
    cards: [{ cardNumber: '3701 XXXXXX 4321', cardType: 'Platinum', status: 'Active' }],
  },
  '11111': {
    name: 'Robert Brown',
    cards: [{ cardNumber: '3799 XXXXXX 8888', cardType: 'Gold', status: 'Active' }],
  },
  '22222': {
    name: 'Emily Carter',
    cards: [
      { cardNumber: '3755 XXXXXX 2200', cardType: 'Centurion', status: 'Active' },
      { cardNumber: '3766 XXXXXX 3311', cardType: 'Platinum', status: 'Active' },
    ],
  },
  '33333': {
    name: 'Michael Chen',
    cards: [{ cardNumber: '3788 XXXXXX 5500', cardType: 'Gold', status: 'Active' }],
  },
};

export const WEARABLE_TYPES: WearableTypeOption[] = [
  {
    id: 'Watch',
    label: 'Watch',
    svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 28C10.477 28 6 23.523 6 18V14C6 8.477 10.477 4 16 4C21.523 4 26 8.477 26 14V18C26 23.523 21.523 28 16 28Z" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M10 14C10 11.239 12.686 9 16 9C19.314 9 22 11.239 22 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M10 18C10 20.761 12.686 23 16 23C19.314 23 22 20.761 22 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
      </svg>`,
  },
  {
    id: 'band',
    label: 'Band',
    svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="2" width="8" height="9" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="10" y="10" width="12" height="12" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="12" y="21" width="8" height="9" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <line x1="13.5" y1="14.5" x2="18.5" y2="14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="13.5" y1="17.5" x2="18.5" y2="17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`,
  },
  {
    id: 'ring',
    label: 'Ring',
    svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 22V17C6 11.477 10.477 7 16 7C21.523 7 26 11.477 26 17V22" stroke="currentColor" stroke-width="2" fill="none"/>
        <ellipse cx="16" cy="22" rx="10" ry="4.5" stroke="currentColor" stroke-width="2" fill="none"/>
        <ellipse cx="16" cy="17" rx="4" ry="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
      </svg>`,
  },
];

export const WEARABLE_PRODUCTS: Record<string, WearableProduct[]> = {
  Watch: [
    {
      name: 'Amex Leather Watch',
      type: 'Leather Watch',
      colors: [
        { hex: '#8B5E3C', label: 'Brown' },
        { hex: '#1a1a1a', label: 'Black' },
      ],
      icon: '⌚',
    },
    {
      name: 'Amex Sport Watch',
      type: 'Sport Watch',
      colors: [
        { hex: '#1a1a1a', label: 'Black' },
        { hex: '#e8e8e8', label: 'Silver' },
      ],
      icon: '⌚',
    },
  ],
  band: [
    {
      name: 'Amex Sport Band',
      type: 'Sport Band',
      colors: [
        { hex: '#1a1a1a', label: 'Black' },
        { hex: '#00274c', label: 'Navy' },
      ],
      icon: '⌚',
    },
    {
      name: 'Amex Silicone Band',
      type: 'Silicone Band',
      colors: [
        { hex: '#003087', label: 'Navy Blue' },
        { hex: '#8b0000', label: 'Red' },
      ],
      icon: '⌚',
    },
  ],
  ring: [
    {
      name: 'Amex Ceramic Ring',
      type: 'Ceramic Ring',
      colors: [
        { hex: '#e8e8e8', label: 'White' },
        { hex: '#1a1a1a', label: 'Black' },
      ],
      icon: '💍',
    },
    {
      name: 'Amex Titanium Ring',
      type: 'Titanium Ring',
      colors: [
        { hex: '#aab0bb', label: 'Silver' },
        { hex: '#4a3728', label: 'Bronze' },
      ],
      icon: '💍',
    },
  ],
};
