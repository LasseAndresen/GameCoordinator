import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: 'CardComponent',
};
export default meta;
type Story = StoryObj<CardComponent>;

export const Primary: Story = {
  args: {
    cardTitle: '',
    isCollapse: false,
    smallTitle: false,
    centerTitle: false,
    clickable: false,
  },
};

export const Heading: Story = {
  args: {
    cardTitle: '',
    isCollapse: false,
    smallTitle: false,
    centerTitle: false,
    clickable: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/card works!/gi)).toBeTruthy();
  },
};
