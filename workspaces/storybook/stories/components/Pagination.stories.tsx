import { Pagination as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

const meta = {
  title: 'Components/Pagination',
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
    total: {
      control: { type: 'number', min: 1 },
      defaultValue: { summary: undefined },
    },
    page: {
      control: { type: 'number', min: 1 },
      defaultValue: { summary: undefined },
    },
    siblings: {
      control: { type: 'number', min: 0 },
      defaultValue: { summary: '1' },
    },
    size: {
      options: ['xs', 's'],
      control: 'radio',
      defaultValue: { summary: 's' },
    },
    onChange: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '(page: number) => void' } },
    },
    className: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
  },
  args: {
    total: 10,
    page: 1,
    siblings: 1,
    size: 's',
    onChange: () => {},
    className: '',
  },
  render: function Render(args) {
    const { total, siblings, size, className, onChange } = args;
    const [{ page }, setArgs] = useArgs();

    return (
      <Component
        total={total}
        page={page}
        siblings={siblings}
        size={size}
        className={className ? className : undefined}
        onChange={(value) => {
          setArgs({ page: value });
          onChange?.(value);
        }}
      />
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pagination: Story = {};
