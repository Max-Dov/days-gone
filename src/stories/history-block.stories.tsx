import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HistoryBlock } from '@features';
import { historyDays } from './mocks';

const meta = {
  title: 'History',
  component: HistoryBlock,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HistoryBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Story['args'] = {
  days: []
};

export const defaultHistory: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => <HistoryBlock {...args}></HistoryBlock>
};


export const history: Story = {
  args: {
    ...defaultArgs,
    days: historyDays,
  },
  render: (args) => <HistoryBlock {...args}></HistoryBlock>
};
