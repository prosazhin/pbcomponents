import { Button, Search as Component, Container, type SearchProps } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import { useArgs } from 'storybook/preview-api';

type Option = SearchProps['options'][number];
type Value = Option | Option[] | undefined;
// single и multiple в панели переключаются одним флагом, поэтому пропсы собраны без дискриминированного union;
// addon — какой аддон показать: кнопку слева, справа или ничего
type StoryArgs = Omit<SearchProps, 'multiple' | 'value' | 'defaultValue' | 'onChange'> & {
  multiple?: boolean;
  value?: Value;
  defaultValue?: Value;
  onChange?: (value: Value) => void;
  addon?: 'none' | 'left' | 'right';
};

const StoryComponent = Component as ComponentType<StoryArgs>;

const meta = {
  title: 'Components/Field/Search',
  // args истории шире пропсов компонента (виртуальные поля для панели)
  component: StoryComponent,
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
    addon: {
      options: ['none', 'left', 'right'],
      control: 'radio',
      defaultValue: { summary: 'none' },
      table: { type: { summary: 'leftAddon | rightAddon' } },
    },
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
    popoverClassName: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    popoverItemClassName: { control: 'text', type: 'string', defaultValue: { summary: undefined } },
    multiple: { control: 'boolean', defaultValue: { summary: false } },
  },
  args: {
    addon: 'none',
    size: 'm',
    disabled: false,
    error: false,
    value: undefined,
    placeholder: 'Placeholder',
    onChange: () => {},
    options: ['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => ({ display: value, value: String(index) })),
    multiple: false,
    className: '',
    wrapperClassName: '',
    popoverClassName: '',
    popoverItemClassName: '',
  },
  render: function Render(args) {
    const {
      addon,
      size,
      disabled,
      error,
      placeholder,
      onChange,
      options,
      multiple,
      className,
      wrapperClassName,
      popoverClassName,
      popoverItemClassName,
    } = args;
    const [{ value }, setArgs] = useArgs();

    return (
      <StoryComponent
        size={size}
        leftAddon={
          addon === 'left' ? (
            <Button theme='border' color='secondary'>
              Button
            </Button>
          ) : undefined
        }
        rightAddon={
          addon === 'right' ? (
            <Button theme='border' color='secondary'>
              Button
            </Button>
          ) : undefined
        }
        disabled={disabled}
        error={error}
        value={value}
        placeholder={placeholder ? placeholder : undefined}
        options={options}
        className={className ? className : undefined}
        wrapperClassName={wrapperClassName ? wrapperClassName : undefined}
        popoverClassName={popoverClassName ? popoverClassName : undefined}
        popoverItemClassName={popoverItemClassName ? popoverItemClassName : undefined}
        multiple={multiple}
        onChange={(v) => {
          setArgs({ value: v });
          if (onChange) onChange(v);
        }}
      />
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Search: Story = {};
