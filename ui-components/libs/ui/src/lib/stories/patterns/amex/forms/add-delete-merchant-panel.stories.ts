import type { Meta, StoryObj } from '@storybook/angular';
import { AmexAddDeleteMerchantPanelComponent } from '../../../../patterns/amex/forms/add-delete-merchant-panel';

const meta: Meta<AmexAddDeleteMerchantPanelComponent> = {
  title: 'Patterns/Amex/Forms/AddDeleteMerchantPanel',
  component: AmexAddDeleteMerchantPanelComponent,
  argTypes: {
    mode: { control: 'radio', options: ['add', 'delete'] },
    showTitle: { control: 'boolean' },
    showLabels: { control: 'boolean' },
    addTitle: { control: 'text' },
    deleteTitle: { control: 'text' },
    cardAccentColor: { control: 'color' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexAddDeleteMerchantPanelComponent>;

export const AddMode: Story = {
  name: 'Add mode — no title, no labels (default)',
  args: { mode: 'add', merchantOptions: [] },
};

export const AddModeWithTitleAndLabels: Story = {
  name: 'Add mode — title + labels on',
  args: { mode: 'add', showTitle: true, showLabels: true, merchantOptions: [] },
};

export const DeleteMode: Story = {
  name: 'Delete mode — no title, no labels (default)',
  args: {
    mode: 'delete',
    merchantOptions: [
      { merchantNo: '9275640241', label: 'Dubai Branch' },
      { merchantNo: '1100286459', label: 'Abu Dhabi Branch' },
      { merchantNo: '1104166483', label: 'Sharjah Branch' },
    ],
  },
};

export const DeleteModeWithTitleAndLabels: Story = {
  name: 'Delete mode — title + labels on',
  args: {
    mode: 'delete',
    showTitle: true,
    showLabels: true,
    merchantOptions: [
      { merchantNo: '9275640241', label: 'Dubai Branch' },
      { merchantNo: '1100286459', label: 'Abu Dhabi Branch' },
      { merchantNo: '1104166483', label: 'Sharjah Branch' },
    ],
  },
};

export const DeleteEmpty: Story = {
  name: 'Delete mode — no merchants',
  args: { mode: 'delete', merchantOptions: [] },
};