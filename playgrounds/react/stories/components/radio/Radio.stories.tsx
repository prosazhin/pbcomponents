import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Radio as Component } from '@pbcomponents/react';
import { labelPlaceArg, radioArg, textClassNameTypeArg, wrapperClassNameTypeArg } from '../../args';

const meta = {
  title: 'Components/Radio/Radio',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(radioArg),
    ...Object.assign(labelPlaceArg),
    ...Object.assign(wrapperClassNameTypeArg),
    ...Object.assign(textClassNameTypeArg),
  },
  args: {
    children: 'Label',
    labelPlace: 'right',
    size: 'm',
    checked: false,
    disabled: false,
    value: '',
    onChange: () => {},
    leftIcon: undefined,
    leftIconClassName: '',
    rightIcon: undefined,
    rightIconClassName: '',
    className: '',
    wrapperClassName: '',
    textClassName: '',
  },
  render: ({
    children,
    checked,
    value,
    labelPlace,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    size,
    disabled,
    className,
    wrapperClassName,
    textClassName,
    name,
    onChange,
  }) => (
    <Component
      value={value}
      size={size}
      labelPlace={labelPlace}
      checked={checked}
      disabled={disabled}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
      className={className ? className : undefined}
      wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
      textClassName={textClassName ? textClassName : undefined}
      name={name ? name : undefined}
      onChange={onChange}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
