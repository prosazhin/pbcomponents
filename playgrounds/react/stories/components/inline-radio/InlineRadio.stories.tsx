import { Meta, StoryObj } from '@storybook/react';

import { InlineRadio as Component, InlineRadioItem } from '@pbcomponents/react';
import { classNameArg, SMSizeArg } from '../../args';

const meta = {
  title: 'Components/Inline Radio/Inline Radio',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(classNameArg),
    ...Object.assign(SMSizeArg),
    children: {
      type: 'InlineRadioItem[]',
      defaultValue: { summary: undefined },
    },
    defaultValue: {
      control: 'text',
      defaultValue: { summary: undefined },
    },
    onChange: {
      defaultValue: { summary: undefined },
      type: '(value, event) => void',
    },
  },
  args: {
    children: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => (
      <InlineRadioItem key={index} value={value}>
        {value}
      </InlineRadioItem>
    )),
    size: 'm',
    defaultValue: 'One',
    onChange: () => {},
    className: '',
  },
  render: ({ children, size, className, defaultValue, onChange }) => (
    <Component size={size} className={className ? className : undefined} defaultValue={defaultValue} onChange={onChange}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
