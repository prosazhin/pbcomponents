import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Button, Input as Component } from '@pbcomponents/react';
import { useArgs } from '@storybook/preview-api';
import { inputArg } from '../../args';
import '../../index.css';

const meta = {
  title: 'Components/Input',
  component: Component,
  parameters: {
    layout: 'centered',
  },
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
    rightIcon: undefined,
    className: '',
    wrapperClassName: '',
  },
  render: function Render(args) {
    const { children, button, placeholder, size, disabled, error, leftIcon, rightIcon, className, wrapperClassName, type } = args;
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
        // @ts-expect-error: Unreachable code error
        rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
        className={className ? className : undefined}
        wrapperClassName={wrapperClassName ? `input-width ${wrapperClassName}` : `input-width`}
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

export const S: Story = {};
