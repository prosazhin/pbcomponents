import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Tag as Component } from '@pbcomponents/react';
import { checkedArg, defaultArgs, disabledArg, hrefArg, iconsArg, loadingArg, SMSizeArg } from '../../args';

const meta = {
  title: 'Components/Tag/Tag Link',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(defaultArgs),
    ...Object.assign(SMSizeArg),
    ...Object.assign(iconsArg),
    ...Object.assign(checkedArg),
    ...Object.assign(disabledArg),
    ...Object.assign(loadingArg),
    ...Object.assign(hrefArg),
    theme: {
      options: ['light', 'border'],
      control: { type: 'radio' },
      defaultValue: { summary: 'light' },
    },
  },
  args: {
    children: 'Tag',
    size: 's',
    theme: 'light',
    checked: false,
    disabled: false,
    loading: false,
    href: '#',
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
  render: ({ children, leftIcon, rightIcon, size, theme, checked, disabled, loading, href, className }) => (
    <Component
      size={size}
      theme={theme}
      checked={checked}
      disabled={disabled}
      loading={loading}
      href={href}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      className={className ? className : undefined}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const S: Story = {};
