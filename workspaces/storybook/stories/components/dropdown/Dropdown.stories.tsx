import { ArrowRightStartOnRectangleIcon, Cog6ToothIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Badge, Dropdown as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Dropdown/Dropdown',
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
    className: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    wrapperClassName: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    align: {
      options: ['left', 'right'],
      control: 'radio',
      defaultValue: { summary: 'left' },
    },
  },
  args: {
    align: 'left',
    className: '',
    wrapperClassName: '',
  },
  render: ({ className, wrapperClassName, align }) => (
    <Component className={className ? className : undefined} wrapperClassName={wrapperClassName ? wrapperClassName : undefined}>
      <Component.Trigger>Dropdown Button</Component.Trigger>
      <Component.Content align={align}>
        <Component.Item badge={<Badge color='secondary'>2</Badge>} leftIcon={UserCircleIcon}>
          My orders
        </Component.Item>
        <Component.Item leftIcon={Cog6ToothIcon}>Profile setting</Component.Item>
        <Component.Item borderTop leftIcon={ArrowRightStartOnRectangleIcon}>
          Sign out
        </Component.Item>
      </Component.Content>
    </Component>
  ),
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dropdown: Story = {};
