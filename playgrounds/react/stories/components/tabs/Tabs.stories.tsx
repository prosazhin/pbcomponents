import { Meta, StoryObj } from '@storybook/react';

import { Tabs as Component, Tab } from '@pbcomponents/react';
import { classNameArg } from '../../args';

const meta = {
  title: 'Components/Tabs/Tabs',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(classNameArg),
    children: {
      type: 'Tab[]',
      defaultValue: { summary: undefined },
    },
    defaultIndex: {
      control: 'number',
      defaultValue: { summary: 0 },
    },
    onChange: {
      defaultValue: { summary: undefined },
      type: '(index, event) => void',
    },
  },
  args: {
    children: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => (
      <Tab key={index} label={value}>
        <div style={{ marginTop: '24px' }}>{`Content for "${value}" tab`}</div>
      </Tab>
    )),
    defaultIndex: 0,
    onChange: () => {},
    className: '',
  },
  render: ({ children, className, defaultIndex, onChange }) => (
    <Component className={className ? className : undefined} defaultIndex={defaultIndex} onChange={onChange}>
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
