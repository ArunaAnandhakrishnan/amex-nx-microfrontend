import type { Meta, StoryObj } from '@storybook/angular';
import { ContactSectionCardComponent } from '../../../../patterns/amex/forms/contact-section-card';

const meta: Meta<ContactSectionCardComponent> = {
  title: 'Patterns/Amex/Forms/ContactSectionCard',
  component: ContactSectionCardComponent,
  argTypes: {
    title: { control: 'text' },
    accentColor: { control: 'color' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<ContactSectionCardComponent>;

export const Marketing: Story = {
  name: 'Marketing section - empty (matches image1)',
  args: {
    title: 'Marketing',
    contacts: [
      { name: '', jobTitle: '', email: '', countryCode: '', landline: '', mobile: '' },
      { name: '', jobTitle: '', email: '', countryCode: '', landline: '', mobile: '' },
      { name: '', jobTitle: '', email: '', countryCode: '', landline: '', mobile: '' },
    ],
  },
};

export const Finance: Story = {
  name: 'Finance section - empty (matches image2)',
  args: {
    title: 'Finance',
    contacts: [
      { name: '', jobTitle: '', email: '', countryCode: '', landline: '', mobile: '' },
      { name: '', jobTitle: '', email: '', countryCode: '', landline: '', mobile: '' },
      { name: '', jobTitle: '', email: '', countryCode: '', landline: '', mobile: '' },
    ],
  },
};

export const OperationsPreFilled: Story = {
  name: 'Operations section - pre-filled (matches image3)',
  args: {
    title: 'Operations',
    contacts: [
      { name: 'Omar Ops', jobTitle: 'Operations Head', email: 'ops@merchant.ae', countryCode: '+1', landline: '', mobile: '777777777' },
      { name: 'Sara Khalid', jobTitle: 'Accountant', email: 'sara@merchant.ae', countryCode: '+973', landline: '', mobile: '36987654' },
      { name: '', jobTitle: '', email: '', countryCode: '', landline: '', mobile: '' },
    ],
  },
};