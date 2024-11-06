import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/outline';
import { Content as Component } from '@pbcomponents/react';
import { classNameArg, iconsArg, mediumArg, SMLSizeArg, textClassNameTypeArg } from '../args';

const meta = {
  title: 'Helpers/Content',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(classNameArg),
    ...Object.assign(iconsArg),
    ...Object.assign(SMLSizeArg),
    ...Object.assign(mediumArg),
    ...Object.assign(textClassNameTypeArg),
    as: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: 'span' },
    },
    children: {
      control: 'text',
      type: 'React.ReactNode',
      defaultValue: { summary: undefined },
    },
  },
  args: {
    as: 'span',
    children: 'Content',
    size: 'm',
    medium: false,
    leftIcon: undefined,
    leftIconClassName: '',
    rightIcon: undefined,
    rightIconClassName: '',
    className: '',
    textClassName: '',
  },
  render: ({ as, children, leftIcon, leftIconClassName, rightIcon, rightIconClassName, size, medium, className, textClassName }) => (
    <Component
      as={as}
      size={size}
      medium={medium}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      leftIconClassName={leftIconClassName ? leftIconClassName : undefined}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
      rightIconClassName={rightIconClassName ? rightIconClassName : undefined}
      className={className ? className : undefined}
      textClassName={textClassName ? textClassName : undefined}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
