import { Tabs as Component, Container, Tab } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

const meta = {
  title: 'Components/Tabs/Tabs',
  component: Component,
  decorators: [
    (Story) => (
      <Container size='s'>
        <div style={{ paddingTop: '40px' }}>
          <Story />
        </div>
      </Container>
    ),
  ],
  argTypes: {
    className: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    children: {
      control: 'object',
      table: { type: { summary: 'Tab[]' } },
      defaultValue: { summary: undefined },
    },
    index: {
      control: 'number',
      defaultValue: { summary: undefined },
      table: { type: { summary: 'number' } },
    },
    defaultIndex: {
      control: 'number',
      defaultValue: { summary: 0 },
    },
    theme: {
      options: ['line', 'pill', 'pill-secondary'],
      control: { type: 'radio' },
      defaultValue: { summary: 'line' },
    },
    onChange: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '(index: number, event: Event) => void' } },
    },
  },
  args: {
    children: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => (
      <Tab key={index} label={value}>
        <div style={{ marginTop: '24px' }}>{`Content for "${value}" tab`}</div>
      </Tab>
    )),
    index: undefined,
    defaultIndex: 0,
    theme: 'line',
    onChange: () => {},
    className: '',
  },
  render: function Render({ children, className, index, defaultIndex, theme, onChange }) {
    const [, setArgs] = useArgs();

    return (
      <Component
        className={className ? className : undefined}
        index={index}
        defaultIndex={defaultIndex}
        theme={theme}
        onChange={(value, event) => {
          // в контролируемом режиме активный таб хранится в args
          if (index !== undefined) setArgs({ index: value });
          if (onChange) onChange(value, event);
        }}
      >
        {children}
      </Component>
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tabs: Story = {};
