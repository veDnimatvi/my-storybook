import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputNumber } from './InputNumber';

const meta = {
  title: 'Example/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Label',
  },
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'number',
    placeholder: 'Enter numbers only...',
    label: 'Quantity',
    helperText: 'Restricts to digits only.',
  },
};

export const Currency: Story = {
  args: {
    variant: 'currency',
    placeholder: 'Enter amount...',
    label: 'Price',
    suffix: 'VND',
    helperText: 'Formatted with commas as you type.',
  },
};

export const Decimal: Story = {
  args: {
    variant: 'decimal',
    placeholder: 'Enter decimal...',
    label: 'Weight (kg)',
    helperText: 'Max 3 digits after the decimal point.',
  },
};

export const WithError: Story = {
  args: {
    variant: 'number',
    label: 'Age',
    error: 'Age must be at least 18.',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'currency',
    label: 'Read-only Balance',
    value: 5000000,
    disabled: true,
  },
};
