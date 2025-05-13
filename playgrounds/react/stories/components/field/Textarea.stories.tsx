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
    size: 'm',
    disabled: false,
    error: false,
    value: '',
    placeholder: 'Placeholder',
    onChange: () => {},
    className: '',
    wrapperClassName: '',
  },
  render: function Render(args) {
    const { size, disabled, error, placeholder, onChange, className, wrapperClassName } = args;
    const [{ value }, setArgs] = useArgs();

    return (
      <Component
        size={size}
        disabled={disabled}
        error={error}
        value={value ? value : undefined}
        placeholder={placeholder ? placeholder : undefined}
        className={className ? className : undefined}
        wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
        onChange={(v: string, event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setArgs({ value: v });
          if (onChange) onChange(v, event);
        }}
      />
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
