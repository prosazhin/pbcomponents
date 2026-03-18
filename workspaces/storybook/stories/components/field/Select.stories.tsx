import { Select as Component, Container } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

const meta = {
  title: 'Components/Field/Select',
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
    wrapperClassName: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    size: { options: ['s', 'm'], control: 'radio', defaultValue: { summary: 'm' } },
    disabled: { control: 'boolean', defaultValue: { summary: 'false' } },
    error: { control: 'boolean', defaultValue: { summary: 'false' } },
    placeholder: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    value: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: 'Option | Option[]' } },
    },
    options: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '{ display: string; value?: string; disabled?: boolean; badge?: Badge; }[]' } },
    },
    onChange: {
      control: 'object',
      defaultValue: { summary: undefined },
      table: { type: { summary: '(value: Option | Option[]) => void' } },
    },
    dropdownClassName: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    dropdownItemClassName: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    multiple: { control: 'boolean', defaultValue: { summary: false } },
    search: { control: 'boolean', defaultValue: { summary: false } },
    searchPlaceholder: { control: 'text', type: 'string', defaultValue: { summary: 'Placeholder' } },
  },
  args: {
    size: 'm',
    disabled: false,
    error: false,
    value: undefined,
    placeholder: 'Placeholder',
    onChange: () => {},
    options: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => ({ display: value, value: String(index) })),
    multiple: false,
    search: false,
    searchPlaceholder: 'Placeholder',
    className: '',
    wrapperClassName: '',
    dropdownClassName: '',
    dropdownItemClassName: '',
  },
  render: function Render(args) {
    const {
      size,
      disabled,
      error,
      placeholder,
      onChange,
      options,
      multiple,
      search,
      searchPlaceholder,
      className,
      wrapperClassName,
      dropdownClassName,
      dropdownItemClassName,
    } = args;
    const [{ value }, setArgs] = useArgs();

    return (
      <Component
        size={size}
        disabled={disabled}
        error={error}
        value={value}
        placeholder={placeholder ? placeholder : undefined}
        options={options}
        multiple={multiple}
        search={search}
        searchPlaceholder={searchPlaceholder}
        className={className ? className : undefined}
        wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
        dropdownClassName={dropdownClassName ? dropdownClassName : undefined}
        dropdownItemClassName={dropdownItemClassName ? dropdownItemClassName : undefined}
        onChange={(v) => {
          setArgs({ value: v });
          if (onChange) onChange(v);
        }}
      />
    );
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Select: Story = {};
