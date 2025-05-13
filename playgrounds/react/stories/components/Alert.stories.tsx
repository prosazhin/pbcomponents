import { Meta, StoryObj } from '@storybook/react';

import { Button, Alert as Component } from '@pbcomponents/react';
import { useArgs } from '@storybook/preview-api';
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
    open: true,
    initialOpacity: 0,
    initialHeight: 0,
    onClose: () => {},
    className: '',
  },
  render: function Render(args) {
    const { children, className, color, headline, description, as, initialOpacity, initialHeight, onClose } = args;
    const [{ open }, setArgs] = useArgs();

    return (
      <Component
        as={as}
        color={color}
        open={open}
        initialOpacity={initialOpacity}
        initialHeight={initialHeight}
        headline={headline ? headline : undefined}
        description={description ? description : undefined}
        className={className ? className : undefined}
        onClose={(value: boolean) => {
          if (onClose) onClose(value);
          setArgs({ open: value });
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
