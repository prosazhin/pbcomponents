import { Field as Component, Container, type FieldProps, Input, Search, Select, Textarea } from '@prosazhin/pbcomponents';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useState } from 'react';

// label, description и errorMessage — содержимое Field.Label, Field.Description и Field.Error
type StoryArgs = FieldProps & { label?: string; description?: string; errorMessage?: string };

type FieldInputControlProps = { placeholder: string } & Omit<ComponentProps<typeof Input>, 'children'>;
const FieldInputControl = ({ placeholder, ...inputProps }: FieldInputControlProps) => {
  const [value, setValue] = useState<string>('');

  return (
    <Input {...inputProps}>
      <Input.Control value={value} placeholder={placeholder} onChange={(nextValue: string) => setValue(nextValue)} />
    </Input>
  );
};

type FieldTextareaControlProps = { placeholder: string } & Omit<ComponentProps<typeof Textarea>, 'value' | 'onChange' | 'placeholder'>;
const FieldTextareaControl = ({ placeholder, ...textareaProps }: FieldTextareaControlProps) => {
  const [value, setValue] = useState<string>('');

  return <Textarea {...textareaProps} value={value} placeholder={placeholder} onChange={(nextValue: string) => setValue(nextValue)} />;
};

const meta = {
  title: 'Components/Field/Field',
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
    errorMessage: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    className: {
      control: 'text',
      type: 'string',
      defaultValue: { summary: undefined },
    },
    error: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    label: {
      control: 'text',
      defaultValue: { summary: undefined },
    },
    description: {
      control: 'text',
      defaultValue: { summary: undefined },
    },
    children: {
      options: ['Input', 'Textarea', 'Select', 'Search', 'X2', 'X3'],
      control: 'select',
      mapping: {
        Input: <FieldInputControl placeholder='Placeholder' />,
        Textarea: <FieldTextareaControl placeholder='Placeholder' />,
        Select: (
          <Select
            options={[
              { display: 'One', value: '0' },
              { display: 'Two', value: '1' },
              { display: 'Three', value: '2' },
              { display: 'Four', value: '3' },
              { display: 'Five', value: '4' },
            ]}
            placeholder='Placeholder'
          />
        ),
        Search: (
          <Search
            options={[
              { display: 'One', value: '0' },
              { display: 'Two', value: '1' },
              { display: 'Three', value: '2' },
              { display: 'Four', value: '3' },
              { display: 'Five', value: '4' },
            ]}
            placeholder='Placeholder'
          />
        ),
        X2: ['One', 'Two'].map((value) => <FieldInputControl key={value} placeholder={`Placeholder ${value}`} />),
        X3: ['One', 'Two', 'Three'].map((value) => <FieldInputControl key={value} placeholder={`Placeholder ${value}`} />),
      },
      defaultValue: { summary: undefined },
      table: { type: { summary: 'Input | Textarea | Select | Search' } },
    },
  },
  args: {
    children: <FieldInputControl placeholder='Placeholder' />,
    label: 'Label',
    description: 'Description',
    error: false,
    errorMessage: '',
    className: '',
  },
  render: ({ children, className, label, description, error, errorMessage }) => (
    <Component error={error} className={className ? className : undefined}>
      {label && <Component.Label>{label}</Component.Label>}
      <Component.Control>{children}</Component.Control>
      {description && <Component.Description>{description}</Component.Description>}
      {errorMessage && <Component.Error>{errorMessage}</Component.Error>}
    </Component>
  ),
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Field: Story = {};
