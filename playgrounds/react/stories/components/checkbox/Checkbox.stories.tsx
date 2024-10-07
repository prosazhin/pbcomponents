import { Meta, StoryObj } from '@storybook/react';

import { Checkbox as Component } from '@pbcomponents/react';
import { useArgs } from '@storybook/preview-api';
import { checkboxArg } from '../../args';

const meta = {
  title: 'Components/Checkbox/Checkbox',
  component: Component,
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
    value: '',
    onChange: () => {},
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
    wrapperClassName: '',
    textClassName: '',
  },
  render: function Render(args) {
    const { value, children, labelPlace, leftIcon, rightIcon, size, disabled, className, wrapperClassName, textClassName } = args;
    const [{ checked, indeterminate }, setArgs] = useArgs();

    return (
      <Component
        value={value}
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
        wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
        textClassName={textClassName ? textClassName : undefined}
        onChange={(newValue) => {
          if (!indeterminate && !checked) {
            setArgs({ checked: newValue, indeterminate: !indeterminate });
          }
          if (indeterminate && checked) {
            setArgs({ indeterminate: !indeterminate });
          }
          if (!indeterminate && checked) {
            setArgs({ checked: newValue });
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

export const C: Story = {};
