import { Meta, StoryObj } from '@storybook/react';

import { Switch as Component } from '@pbcomponents/react';
import { useArgs } from '@storybook/preview-api';
import { checkboxArg } from '../args';

const meta = {
  title: 'Components/Switch',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(checkboxArg),
  },
  args: {
    children: 'Label',
    labelPlace: 'right',
    size: 'm',
    checked: false,
    disabled: false,
    onChange: () => {},
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
  render: function Render(args) {
    const { children, labelPlace, leftIcon, rightIcon, size, disabled, className } = args;
    const [{ checked }, setArgs] = useArgs();

    return (
      <Component
        size={size}
        labelPlace={labelPlace}
        checked={checked}
        disabled={disabled}
        // @ts-expect-error: Unreachable code error
        leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
        // @ts-expect-error: Unreachable code error
        rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
        className={className ? className : undefined}
        onChange={(value) => {
          setArgs({ checked: value });
        }}
      >
        {children}
      </Component>
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
