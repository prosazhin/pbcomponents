import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/solid';
import { Content as Component } from '@pbcomponents/react';
import { defaultArgs, iconsArg, mediumArg, SMLSizeArg } from '../args';

const meta = {
  title: 'Helpers/Content',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(defaultArgs),
    ...Object.assign(iconsArg),
    ...Object.assign(SMLSizeArg),
    ...Object.assign(mediumArg),
  },
  args: {
    children: 'Content',
    size: 'm',
    medium: false,
    leftIcon: undefined,
    rightIcon: undefined,
    className: '',
  },
  render: ({ children, leftIcon, rightIcon, size, medium, className }) => (
    <Component
      size={size}
      medium={medium}
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
