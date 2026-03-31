import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    placeholder: 'Enter text...',
    label: 'Label',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
    label: 'Username',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Type something...',
    label: 'Email',
    error: 'Please enter a valid email address.',
    isError: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Cannot type here...',
    label: 'Disabled Input',
    disabled: true,
  },
};

export const HelperText: Story = {
  args: {
    placeholder: 'Password...',
    label: 'Password',
    helperText: 'Must be at least 8 characters long.',
  },
};
