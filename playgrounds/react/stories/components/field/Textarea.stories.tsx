import { Meta, StoryObj } from '@storybook/react';

import { Textarea as Component } from '@pbcomponents/react';
import { useArgs } from '@storybook/preview-api';
import { textareaArg } from '../../args';

const meta = {
  title: 'Components/Field/Textarea',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(textareaArg),
  },
  args: {
    value: '',
    placeholder: 'Placeholder',
    size: 'm',
    disabled: false,
    error: false,
    onChange: () => {},
    className: '',
    wrapperClassName: '',
  },
  render: function Render(args) {
    const { placeholder, size, disabled, error, className, wrapperClassName } = args;
    const [{ value }, setArgs] = useArgs();

    return (
      <Component
        value={value ? value : undefined}
        placeholder={placeholder ? placeholder : undefined}
        size={size}
        disabled={disabled}
        error={error}
        className={className ? className : undefined}
        wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
        onChange={(v) => {
          setArgs({ value: v });
        }}
      />
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
