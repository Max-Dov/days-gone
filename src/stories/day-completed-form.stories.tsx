import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DayCompletedForm } from '@features';
import { useDayBitsDescriptorsStore } from '@zustand';
import { dayBitDescriptorsMock } from './mocks';

const meta = {
  title: 'Day Completed Form',
  component: DayCompletedForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DayCompletedForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const formWithSteps: Story = {
  args: { date: new Date().getTime() },
  render: (args) => {
    useDayBitsDescriptorsStore.setState({ dayBitsDescriptors: dayBitDescriptorsMock });
    return <DayCompletedForm {...args} />;
  }
};

export const loadingQuestions: Story = {
  args: { date: new Date().getTime() },
  render: (args) => {
    useDayBitsDescriptorsStore.setState({ dayBitsDescriptors: undefined });
    return <DayCompletedForm {...args} />;
  }
};

export const noQuestions: Story = {
  args: { date: new Date().getTime() },
  render: (args) => {
    useDayBitsDescriptorsStore.setState({ dayBitsDescriptors: [] });
    return <DayCompletedForm {...args} />;
  }
};