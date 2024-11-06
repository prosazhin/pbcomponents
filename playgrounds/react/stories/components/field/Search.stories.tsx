import { Meta, StoryObj } from '@storybook/react';

import { Button, Search as Component } from '@pbcomponents/react';
import { useArgs } from '@storybook/preview-api';
import { searchArg } from '../../args';

import '../../main.css';

const meta = {
  title: 'Components/Field/Search',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(searchArg),
    button: {
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
    size: 'm',
    disabled: false,
    error: false,
    value: undefined,
    placeholder: 'Placeholder',
    onChange: () => {},
    options: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => ({ display: value, value: String(index) })),
    multiple: false,
    button: undefined,
    className: '',
    wrapperClassName: '',
    dropdownClassName: '',
    dropdownItemClassName: '',
  },
  render: function Render(args) {
    const {
      size,
      disabled,
      error,
      placeholder,
      onChange,
      options,
      multiple,
      button,
      className,
      wrapperClassName,
      dropdownClassName,
      dropdownItemClassName,
    } = args;
    const [{ value }, setArgs] = useArgs();

    return (
      <Component
        size={size}
        disabled={disabled}
        error={error}
        value={value}
        placeholder={placeholder ? placeholder : undefined}
        options={options}
        multiple={multiple}
        button={button}
        className={className ? className : undefined}
        wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
        dropdownClassName={dropdownClassName ? dropdownClassName : undefined}
        dropdownItemClassName={dropdownItemClassName ? dropdownItemClassName : undefined}
        onChange={(v) => {
          setArgs({ value: v });
          if (onChange) onChange(v);
        }}
      />
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
