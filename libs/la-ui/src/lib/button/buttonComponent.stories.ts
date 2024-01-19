import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './buttonComponent';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'ButtonComponent',
};
export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    text: '',
    icon: '',
  },
};

export const Heading: Story = {
  args: {
    text: '',
    icon: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/buttonComponent works!/gi)).toBeTruthy();
  },
};
