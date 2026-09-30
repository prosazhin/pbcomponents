import { Container as Component, type ContainerProps } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';

// leftAside и rightAside включают Container.LeftAside и Container.RightAside
type StoryArgs = ContainerProps & { leftAside?: boolean; rightAside?: boolean };

const meta = {
  title: 'Components/Container',
  component: Component,
  argTypes: {
    className: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    size: {
      options: ['full', 'm', 's'],
      control: 'radio',
      defaultValue: { summary: 'full' },
    },
    leftAside: {
      control: 'boolean',
      defaultValue: { summary: true },
    },
    rightAside: {
      control: 'boolean',
      defaultValue: { summary: true },
    },
  },
  args: {
    size: 'full',
    leftAside: true,
    rightAside: true,
    className: '',
  },
  render: ({ className, size, leftAside, rightAside }) => (
    <Component size={size} className={className ? className : undefined}>
      {leftAside && <Component.LeftAside>Left Aside</Component.LeftAside>}
      <Component.Main>
        <div>Container</div>
      </Component.Main>
      {rightAside && <Component.RightAside>Right Aside</Component.RightAside>}
    </Component>
  ),
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Container: Story = {};
