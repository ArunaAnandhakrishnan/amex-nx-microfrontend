import type { Meta, StoryObj } from '@storybook/angular';
import { AmexReportDownloadButtonComponent } from '../../../../patterns/amex/action/report-download-button';

const meta: Meta<AmexReportDownloadButtonComponent> = {
  title: 'Patterns/Amex/Action/ReportDownloadButton',
  component: AmexReportDownloadButtonComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'needs-improvement',
    'keyboard-navigation',
    'screen-reader',
  ],
  argTypes: {
    download: { action: 'download' },
    back: { action: 'back' },
  },
};
export default meta;
type Story = StoryObj<AmexReportDownloadButtonComponent>;

export const BCRBExcel: Story = {
  name: 'BCRB — Export to Excel (default)',
  args: {
    config: {
      formats: ['excel'],
      submitLabel: 'Submit Request',
      showBack: true,
      backLabel: 'Back to main page',
    },
  },
};

export const OMSPdf: Story = {
  name: 'OMS — Export to PDF',
  args: {
    config: {
      label: 'Export to PDF',
      formats: ['pdf'],
      submitLabel: 'Download Report',
      showBack: true,
      backLabel: 'Back to main page',
    },
  },
};
export const BTACsv: Story = {
  name: 'BTA — Export to CSV',
  args: {
    config: {
      label: 'Export to CSV',
      formats: ['csv'],
      submitLabel: 'Download Report',
      showBack: false,
    },
  },
};
export const SOCMultiFormat: Story = {
  name: 'SOC/ROC — Multi-format dropdown',
  args: {
    config: {
      formats: ['excel', 'pdf', 'csv', 'rtf'],
      label: 'Export Report',
      submitLabel: 'Submit Request',
      showBack: true,
      backLabel: 'Back to main page',
    },
  },
};

export const Loading: Story = {
  name: 'Loading state',
  args: {
    config: {
      formats: ['excel'],
      submitLabel: 'Submit Request',
      showBack: true,
      loading: true,
    },
  },
};
export const NoBackButton: Story = {
  name: 'No Back button',
  args: {
    config: {
      formats: ['excel'],
      submitLabel: 'Download Now',
      showBack: false,
    },
  },
};
