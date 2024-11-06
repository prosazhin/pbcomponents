import { Meta, StoryObj } from '@storybook/react';

import * as heroicons from '@heroicons/react/24/outline';
import { Icon as Component } from '@pbcomponents/react';
import { classNameArg, iconArg, SMLSizeArg } from '../args';

const meta = {
  title: 'Helpers/Icon',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(SMLSizeArg),
    ...Object.assign(classNameArg),
    tag: { ...iconArg },
  },
  args: {
    // @ts-expect-error: Unreachable code error
    tag: 'CheckIcon',
    size: 'm',
    className: '',
  },
  // @ts-expect-error: Unreachable code error
  render: ({ tag, size, className }) => <Component tag={heroicons[tag]} size={size} className={className ? className : undefined} />,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
