import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TreeSelect } from './TreeSelect';

const sampleTreeData = [
  {
    value: 'parent1',
    label: 'Parent 1',
    children: [
      { 
        value: 'child1-1', 
        label: 'Child 1-1',
        children: [
          { value: 'grandchild1-1-1', label: 'Grandchild 1-1-1' },
          { value: 'grandchild1-1-2', label: 'Grandchild 1-1-2' },
        ]
      },
      { value: 'child1-2', label: 'Child 1-2' },
    ],
  },
  {
    value: 'parent2',
    label: 'Parent 2',
    children: [
      { value: 'child2-1', label: 'Child 2-1' },
      { value: 'child2-2', label: 'Child 2-2' },
    ],
  },
];

const meta = {
  title: 'Example/TreeSelect',
  component: TreeSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Select Category',
    treeData: sampleTreeData,
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Browse categories...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'grandchild1-1-1',
    label: 'Pre-selected Nested Item',
  },
};

export const WithError: Story = {
  args: {
    error: 'Please select a specific node.',
    label: 'Required Hierarchy Selection',
  },
};

export const Interactive: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState<string | number>(args.value || '');
    return <div style={{width: '350px'}}><TreeSelect {...args} value={val} onChange={setVal} /></div>;
  }
};
