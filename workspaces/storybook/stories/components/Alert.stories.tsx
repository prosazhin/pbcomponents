import { Button, Alert as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

const meta = {
  title: 'Components/Alert',
  component: Component,
  decorators: [
    (Story) => (
      <Container size='s'>
        <Container.Main>
          <div style={{ paddingTop: '40px' }}>
            <Story />
          </div>
        </Container.Main>
      </Container>
    ),
  ],
  argTypes: {
    className: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    as: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: 'select',
      defaultValue: { summary: 'h3' },
      type: 'string',
    },
    headline: { control: 'text', defaultValue: { summary: undefined } },
    description: { control: 'text', defaultValue: { summary: undefined } },
    color: {
      options: ['primary', 'secondary', 'success', 'danger'],
      control: { type: 'radio' },
      defaultValue: { summary: 'primary' },
    },
    open: { control: 'boolean', defaultValue: { summary: true } },
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
      table: { type: { summary: 'Button[]' } },
    },
  },
  args: {
    headline: 'Headline',
    description: 'Description',
    as: 'h3',
    color: 'primary',
    children: undefined,
    open: true,
    className: '',
  },
  render: function Render(args) {
    const { children, className, color, headline, description, as } = args;
    const [{ open }, setArgs] = useArgs();

    return (
      <Component
        color={color}
        open={open}
        className={className ? className : undefined}
        onOpenChange={(value: boolean) => {
          setArgs({ open: value });
        }}
      >
        {headline && <Component.Title as={as}>{headline}</Component.Title>}
        {description && <Component.Description>{description}</Component.Description>}
        {children && <Component.Actions>{children}</Component.Actions>}
      </Component>
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Alert: Story = {};
