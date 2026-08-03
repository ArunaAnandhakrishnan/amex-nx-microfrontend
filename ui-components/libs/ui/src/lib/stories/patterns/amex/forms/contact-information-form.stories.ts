import type { Meta, StoryObj } from '@storybook/angular';
import { AmexContactInformationFormComponent } from '../../../../patterns/amex/forms/contact-information-form';
import { ContactRow } from '../../../../patterns/amex/forms/contact-section-card';

const emptyRow = (): ContactRow => ({
  name: '',
  jobTitle: '',
  email: '',
  countryCode: '',
  landline: '',
  mobile: '',
});

const meta: Meta<AmexContactInformationFormComponent> = {
  title: 'Patterns/Amex/Forms/ContactInformationForm',
  component: AmexContactInformationFormComponent,
  argTypes: {
    accentColor: { control: 'color' },
    errorMessage: { control: 'text' },
    contactName: { control: 'text' },
    websiteUrl: { control: 'text' },
    omsEmail: { control: 'text' },
    backLabel: { control: 'text' },
    saveLabel: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexContactInformationFormComponent>;

export const Empty: Story = {
  name: 'Empty - Marketing/Finance/Operations, 3 rows each (OMS default)',
  args: {
    sections: [
      { title: 'Marketing', contacts: [emptyRow(), emptyRow(), emptyRow()] },
      { title: 'Finance', contacts: [emptyRow(), emptyRow(), emptyRow()] },
      { title: 'Operations', contacts: [emptyRow(), emptyRow(), emptyRow()] },
    ],
  },
};

export const WithErrorBanner: Story = {
  name: 'Error banner shown (matches image1)',
  args: {
    errorMessage:
      'Some unexpected error has occurred. We are sorry for the inconvenience. Please try again after sometime.',
    sections: [
      { title: 'Marketing', contacts: [emptyRow(), emptyRow(), emptyRow()] },
      { title: 'Finance', contacts: [emptyRow(), emptyRow(), emptyRow()] },
      { title: 'Operations', contacts: [emptyRow(), emptyRow(), emptyRow()] },
    ],
  },
};

export const PreFilled: Story = {
  name: 'Pre-filled top fields + contacts',
  args: {
    contactName: 'Ahmed Al Mansouri',
    websiteUrl: 'https://merchant.ae',
    omsEmail: 'oms@merchant.ae',
    sections: [
      {
        title: 'Marketing',
        contacts: [
          {
            name: 'Sara Khalid',
            jobTitle: 'Marketing Lead',
            email: 'sara@merchant.ae',
            countryCode: '+971',
            landline: '',
            mobile: '501234567',
          },
          emptyRow(),
          emptyRow(),
        ],
      },
      {
        title: 'Finance',
        contacts: [
          {
            name: 'John Finance',
            jobTitle: 'Finance Manager',
            email: 'finance@merchant.ae',
            countryCode: '+91',
            landline: '17123456',
            mobile: '39123456',
          },
          emptyRow(),
          emptyRow(),
        ],
      },
      {
        title: 'Operations',
        contacts: [
          {
            name: 'Omar Ops',
            jobTitle: 'Operations Head',
            email: 'ops@merchant.ae',
            countryCode: '+1',
            landline: '',
            mobile: '777777777',
          },
          emptyRow(),
          emptyRow(),
        ],
      },
    ],
  },
};
