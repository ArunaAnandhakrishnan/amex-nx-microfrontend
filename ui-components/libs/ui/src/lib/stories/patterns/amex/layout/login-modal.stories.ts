import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { AmexLoginModalComponent } from '../../../../patterns/amex/layout/login-modal.component';

const meta: Meta<AmexLoginModalComponent> = {
  title: 'Patterns/Amex/Layout/LoginModal',
  component: AmexLoginModalComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'form-validation',
    'keyboard-navigation',
    'screen-reader',
  ],
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
    moduleMetadata({}),
  ],
  argTypes: {
    portalTitle: { control: 'text' },
    portalStyle: { control: 'select', options: ['onls', 'bcrb', 'oms'] },
    brandNameLine1: { control: 'text' },
    brandNameLine2: { control: 'text' },
    subtitle: { control: 'text' },
    usernameLabel: { control: 'text' },
    usernamePlaceholder: { control: 'text' },
    passwordLabel: { control: 'text' },
    passwordPlaceholder: { control: 'text' },
    submitLabel: { control: 'text' },
    submitVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    forgotPasswordLabel: { control: 'text' },
    footerText: { control: 'text' },
    demoHintPrefix: { control: 'text' },
    demoHintSuffix: { control: 'text' },
    showPasswordIcon: { control: 'text' },
    hidePasswordIcon: { control: 'text' },
    showPasswordAriaLabel: { control: 'text' },
    hidePasswordAriaLabel: { control: 'text' },
    loginUrl: { control: 'text' },
    demoMode: { control: 'boolean' },
    demoCredentials: { control: 'object' },
    loginSuccess: { action: 'loginSuccess' },
  },
};
export default meta;
type Story = StoryObj<AmexLoginModalComponent>;

export const Default: Story = {
  args: {
    demoMode: true,
    demoCredentials: { username: 'demo', password: 'demo' },
  },
};

export const BCRBStyle: Story = {
  args: {
    portalTitle: 'BCRB Reporting Portal',
    portalStyle: 'bcrb',
    demoMode: true,
    demoCredentials: { username: 'bcrb-admin', password: 'demo' },
  },
};
export const OMSStyle: Story = {
  args: {
    portalTitle: 'OMS Merchant Portal',
    portalStyle: 'oms',
    demoMode: true,
    demoCredentials: { username: 'oms-admin', password: 'demo' },
  },
};
export const WithError: Story = {
  args: {
    demoMode: true,
    demoCredentials: { username: 'demo', password: 'demo' },
  },
  play: async ({ canvasElement }) => {
    const usernameInput = canvasElement.querySelector<HTMLInputElement>(
      'input[id$="-username"]',
    );
    const passwordInput = canvasElement.querySelector<HTMLInputElement>(
      'input[id$="-password"]',
    );
    const submitBtn = canvasElement.querySelector<HTMLButtonElement>(
      'button[id$="-submit"]',
    );
    if (usernameInput && passwordInput && submitBtn) {
      usernameInput.value = 'wrong-user';
      usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput.value = 'wrong-pass';
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
      submitBtn.click();
    }
  },
};
export const NoLoginUrlConfigured: Story = {
  name: 'Misconfigured (no loginUrl, demoMode off)',
  args: {
    demoMode: false,
    loginUrl: '',
  },
};

export const LiveBackend: Story = {
  name: 'Live backend (loginUrl configured)',
  args: {
    demoMode: false,
    loginUrl: 'http://localhost:8080/api/auth/login',
  },
};
