import { Meta, StoryObj } from '@storybook/react';

import { Button, Alert as Component } from '@pbcomponents/react';
import { alertArg } from '../args';

const meta = {
  title: 'Components/Alert',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    ...Object.assign(alertArg),
    children: {
      options: [
        undefined,
        ['One', 'Two'].map((value, index) => (
          <Button key={index} color='secondary' size='s'>
            {value}
          </Button>
        )),
      ],
      control: {
        type: 'select',
        labels: {
          undefined,
          '[object Object],[object Object]': 'Buttons',
        },
      },
      defaultValue: { summary: undefined },
      type: 'Button[]',
    },
  },
  args: {
    headline: 'Headline',
    description: 'Description',
    as: 'h3',
    color: 'primary',
    children: undefined,
    className: '',
  },
  render: ({ children, className, color, headline, description, as }) => (
    <Component
      as={as}
      color={color}
      headline={headline ? headline : undefined}
      description={description ? description : undefined}
      className={className ? className : undefined}
    >
      {children}
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const C: Story = {};
