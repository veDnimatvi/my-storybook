import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  title: 'Example/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Choose an option',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'dragonfruit', label: 'Dragonfruit' },
      { value: 'eggplant', label: 'Eggplant' },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Pick a fruit...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'banana',
    label: 'Pre-selected Fruit',
  },
};

export const WithError: Story = {
  args: {
    error: 'Please select a valid option.',
    label: 'Required Selection',
  },
};

export const NoOptions: Story = {
  args: {
    options: [],
    placeholder: 'No fruits found...',
    label: 'Empty Select',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Locked Select',
  },
};

// Interactive demonstration
export const Interactive: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState<string | number>(args.value || '');
    return <div style={{width: '300px'}}><Select {...args} value={val} onChange={setVal} /></div>;
  }
};
