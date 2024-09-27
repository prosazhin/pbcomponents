import { Meta, StoryObj } from '@storybook/react';

import { Radio as Component } from '@pbcomponents/react';
import { labelPlaceArg, radioArg } from '../../args';

const meta = {
  title: 'Components/Radio Group/Radio',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(radioArg),
    ...Object.assign(labelPlaceArg),
  },
  args: {
    children: 'Label',
    labelPlace: 'right',
    size: 'm',
    checked: false,
    disabled: false,
    value: '',
    name: '',
    onChange: () => {},
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
  render: ({ children, checked, value, labelPlace, leftIcon, rightIcon, size, disabled, className, name, onChange }) => (
    <Component
      value={value}
      size={size}
      labelPlace={labelPlace}
      checked={checked}
      disabled={disabled}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      className={className ? className : undefined}
      name={name ? name : undefined}
      onChange={onChange}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
