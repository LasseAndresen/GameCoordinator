import type { Meta, StoryObj } from '@storybook/angular';
import { DialogComponent } from './dialogComponent';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DialogComponent> = {
  component: DialogComponent,
  title: 'DialogComponent',
};
export default meta;
type Story = StoryObj<DialogComponent>;

export const Primary: Story = {
  args: {
    height: 0,
    width: 0,
    title: '',
  },
};

export const Heading: Story = {
  args: {
    height: 0,
    width: 0,
    title: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dialogComponent works!/gi)).toBeTruthy();
  },
};
