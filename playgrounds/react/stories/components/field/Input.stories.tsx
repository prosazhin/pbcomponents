import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Button, Input as Component } from '@pbcomponents/react';
import { useArgs } from '@storybook/preview-api';
import { inputArg } from '../../args';

const meta = {
  title: 'Components/Field/Input',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(inputArg),
    children: {
      options: [
        undefined,
        <Button color='secondary' theme='border'>
          Button
        </Button>,
      ],
      control: {
        type: 'select',
        labels: {
          undefined,
          '[object Object]': 'Button',
        },
      },
      defaultValue: { summary: undefined },
      type: 'Button',
    },
  },
  args: {
    children: undefined,
    button: 'left',
    size: 'm',
    disabled: false,
    error: false,
    type: 'text',
    value: '',
    placeholder: 'Placeholder',
    onChange: () => {},
    leftIcon: undefined,
    leftIconClassName: '',
    rightIcon: undefined,
    rightIconClassName: '',
    className: '',
    wrapperClassName: '',
  },
  render: function Render(args) {
    const {
      children,
      button,
      placeholder,
      size,
      disabled,
      error,
      leftIcon,
      leftIconClassName,
      rightIcon,
      rightIconClassName,
      className,
      wrapperClassName,
      type,
    } = args;
    const [{ value }, setArgs] = useArgs();

    return (
      <Component
        value={value ? value : undefined}
        placeholder={placeholder ? placeholder : undefined}
        size={size}
        disabled={disabled}
        error={error}
        type={type}
        // @ts-expect-error: Unreachable code error
        leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
        leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
        // @ts-expect-error: Unreachable code error
        rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
        rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
        className={className ? className : undefined}
        wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
        button={button}
        onChange={(v) => {
          setArgs({ value: v });
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
