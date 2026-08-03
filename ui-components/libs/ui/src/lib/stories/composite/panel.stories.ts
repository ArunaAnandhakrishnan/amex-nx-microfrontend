import type { Meta, StoryObj } from '@storybook/angular';
import { PanelComponent } from '../../composite/panel';

const meta: Meta<PanelComponent> = {
  title: 'Composite/Panel',
  component: PanelComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader'],
  argTypes: {
    title: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<PanelComponent>;

export const Band: Story = {
  args: { title: 'BCRB REPORTS MAIN' },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:480px">
        <ui-panel [title]="title">
          Panel body content goes here — forms, tables, or any projected markup.
        </ui-panel>
      </div>`,
  }),
};

export const NoTitle: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:480px">
        <ui-panel>
          Untitled panel — no band.
        </ui-panel>
      </div>`,
  }),
};
