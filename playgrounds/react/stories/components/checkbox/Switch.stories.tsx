import { Meta, StoryObj } from '@storybook/react';

import { Switch as Component } from '@pbcomponents/react';
import { useArgs } from '@storybook/preview-api';
import { checkboxArg } from '../../args';

const meta = {
  title: 'Components/Checkbox/Switch',
  component: Component,
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
    value: '',
    onChange: () => {},
    className: '',
    wrapperClassName: '',
    textClassName: '',
  },
  render: function Render(args) {
    const { value, children, labelPlace, size, disabled, className, wrapperClassName, textClassName } = args;
    const [{ checked }, setArgs] = useArgs();

    return (
      <Component
        value={value}
        size={size}
        labelPlace={labelPlace}
        checked={checked}
        disabled={disabled}
        className={className ? className : undefined}
        wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
        textClassName={textClassName ? textClassName : undefined}
        onChange={(newValue) => {
          setArgs({ checked: newValue });
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
