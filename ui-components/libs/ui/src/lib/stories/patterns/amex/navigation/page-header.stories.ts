import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPageHeaderComponent } from '../../../../patterns/amex/navigation/page-header';

const meta: Meta<AmexPageHeaderComponent> = {
  title: 'Patterns/Amex/Navigation/PageHeader',
  component: AmexPageHeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    portalStyle: { control: 'radio', options: ['onls', 'oms'] },
    ctaClick: { action: 'ctaClick' },
  },
};
export default meta;
type Story = StoryObj<AmexPageHeaderComponent>;

export const ONLSPriorityPass: Story = {
  name: 'ONLS — Priority Pass Enrollment',
  args: { portalStyle: 'onls', title: 'PRIORITY PASS™ ENROLLMENT' },
};

export const ONLSPayWithPoints: Story = {
  name: 'ONLS — Select & Pay With Points',
  args: {
    portalStyle: 'onls',
    title: 'Pay with points - Agent Portal',
  },
};

export const ONLSForgotPassword: Story = {
  name: 'ONLS — Forgot Password',
  args: { portalStyle: 'onls', title: 'FORGOT PASSWORD' },
};

export const ONLSChangePassword: Story = {
  name: 'ONLS — Change Password',
  args: { portalStyle: 'onls', title: 'Change Password' },
};

export const ONLSWithSubtitle: Story = {
  name: 'ONLS — with subtitle',
  args: {
    portalStyle: 'onls',
    title: 'CENTURION',
    subtitle: 'Centurion 2.0 — Cen LCY EXC',
  },
};

export const ONLSWithCTA: Story = {
  name: 'ONLS — with CTA button',
  args: {
    portalStyle: 'onls',
    title: 'PRIORITY PASS™ ENROLLMENT',
    ctaLabel: 'Refresh Request',
  },
};

export const OMSEditProfile: Story = {
  name: 'OMS — Edit Your Profile',
  args: { portalStyle: 'oms', title: 'EDIT YOUR PROFILE' },
};
export const OMSMrmAdmin: Story = {
  name: 'OMS — MRM User Administration',
  args: { portalStyle: 'oms', title: 'MRM USER ADMINISTRATION' },
};
export const OMSBCRBWithCTA: Story = {
  name: 'OMS — BCRB Reports with CTA',
  args: {
    portalStyle: 'oms',
    title: 'BCRB REPORTS MAIN',
    ctaLabel: 'Request New Report +',
  },
};
export const OMSWithSubtitle: Story = {
  name: 'OMS — with subtitle',
  args: {
    portalStyle: 'oms',
    title: 'MERCHANT DETAILS',
    subtitle: 'All fields marked * are mandatory',
  },
};
