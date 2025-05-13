import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/outline';
import { Badge, DropdownItem as Component } from '@pbcomponents/react';
import { dropdownItemArg } from '../../args';

const meta = {
  title: 'Components/Dropdown/DropdownItem',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(dropdownItemArg),
    badge: {
      options: [undefined, <Badge color='secondary'>badge</Badge>],
      control: {
        type: 'select',
        labels: {
          undefined,
          '[object Object]': 'Badge',
        },
      },
      defaultValue: { summary: undefined },
      type: 'Button',
    },
  },
  args: {
    as: 'button',
    children: 'Dropdown Item',
    borderTop: false,
    borderBottom: false,
    badge: undefined,
    disabled: false,
    href: '#',
    target: '_self',
    type: 'button',
    onClick: () => {},
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
    borderTop,
    borderBottom,
    badge,
    leftIcon,
    leftIconClassName,
    rightIcon,
    rightIconClassName,
    disabled,
    className,
    wrapperClassName,
    textClassName,
    onClick,
    type,
    href,
    target,
  }) => (
    <Component
      disabled={disabled}
      type={type}
      href={href}
      target={target}
      borderTop={borderTop}
      borderBottom={borderBottom}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
      className={className ? className : undefined}
      wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
      textClassName={textClassName ? textClassName : undefined}
      badge={badge}
      onClick={onClick}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
