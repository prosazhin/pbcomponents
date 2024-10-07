import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Content as Component } from '@pbcomponents/react';
import { defaultArgs, iconsArg, mediumArg, SMLSizeArg, textClassNameTypeArg } from '../args';

const meta = {
  title: 'Helpers/Content',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(defaultArgs),
    ...Object.assign(iconsArg),
    ...Object.assign(SMLSizeArg),
    ...Object.assign(mediumArg),
    ...Object.assign(textClassNameTypeArg),
    as: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: 'span' },
    },
  },
  args: {
    as: 'span',
    children: 'Content',
    size: 'm',
    medium: false,
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
    textClassName: '',
  },
  render: ({ as, children, leftIcon, rightIcon, size, medium, className, textClassName }) => (
    <Component
      as={as}
      size={size}
      medium={medium}
      // @ts-expect-error: Unreachable code error
      leftIcon={leftIcon ? heroicons[leftIcon] : leftIcon}
      // @ts-expect-error: Unreachable code error
      rightIcon={rightIcon ? heroicons[rightIcon] : rightIcon}
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
