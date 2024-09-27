import { Meta, StoryObj } from '@storybook/react';

import { Checkbox as Component } from '@pbcomponents/react';
import { useArgs } from '@storybook/preview-api';
import { checkboxArg } from '../args';

const meta = {
  title: 'Components/Checkbox',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(checkboxArg),
    indeterminate: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
  },
  args: {
    children: 'Label',
    labelPlace: 'right',
    size: 'm',
    checked: false,
    indeterminate: false,
    disabled: false,
    onChange: () => {},
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
  render: function Render(args) {
    const { children, labelPlace, leftIcon, rightIcon, size, disabled, className } = args;
    const [{ checked, indeterminate }, setArgs] = useArgs();

    return (
      <Component
        size={size}
        labelPlace={labelPlace}
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        // @ts-expect-error: Unreachable code error
        leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
        // @ts-expect-error: Unreachable code error
        rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
        className={className ? className : undefined}
        onChange={(value) => {
          if (!indeterminate && !checked) {
            setArgs({ checked: value, indeterminate: !indeterminate });
          }
          if (indeterminate && checked) {
            setArgs({ indeterminate: !indeterminate });
          }
          if (!indeterminate && checked) {
            setArgs({ checked: value });
          }
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
