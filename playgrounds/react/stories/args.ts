import * as heroicons from '@heroicons/react/24/solid';

export const childrenArg = {
  children: {
    control: 'text',
    type: 'string',
    defaultValue: { summary: undefined },
  },
};

export const classNameArg = {
  className: {
    control: 'text',
    type: 'string',
    defaultValue: { summary: undefined },
  },
};

export const wrapperClassNameTypeArg = {
  wrapperClassName: {
    control: 'text',
    type: 'string',
    defaultValue: { summary: undefined },
  },
};

export const textClassNameTypeArg = {
  textClassName: {
    control: 'text',
    type: 'string',
    defaultValue: { summary: undefined },
  },
};

export const defaultArgs = {
  ...childrenArg,
  ...classNameArg,
};

export const iconArg = {
  options: [undefined, ...Object.keys(heroicons)],
  control: 'select',
  defaultValue: { summary: undefined },
  type: 'svg',
};

export const leftIcon = {
  ...iconArg,
};
export const rightIcon = {
  ...iconArg,
};

export const iconsArg = {
  leftIcon,
  leftIconClassName: {
    control: 'text',
    type: 'string',
    defaultValue: { summary: undefined },
  },
  rightIcon,
  rightIconClassName: {
    control: 'text',
    type: 'string',
    defaultValue: { summary: undefined },
  },
};

export const sizeArg = {
  size: {
    options: ['xs', 's', 'm', 'l'],
    control: 'radio',
    defaultValue: { summary: 'm' },
  },
};

export const SMLSizeArg = {
  size: {
    options: ['s', 'm', 'l'],
    control: 'radio',
    defaultValue: { summary: 'm' },
  },
};

export const SMSizeArg = {
  size: {
    options: ['s', 'm'],
    control: 'radio',
    defaultValue: { summary: 'm' },
  },
};

export const mediumArg = {
  medium: {
    control: 'boolean',
    defaultValue: { summary: 'false' },
  },
};

export const labelPlaceArg = {
  labelPlace: {
    options: ['left', 'right'],
    control: 'radio',
    defaultValue: { summary: 'right' },
    type: 'string',
  },
};

export const checkedArg = {
  checked: {
    control: 'boolean',
    defaultValue: { summary: 'false' },
  },
};

export const activeArg = {
  active: {
    control: 'boolean',
    defaultValue: { summary: 'false' },
  },
};

export const disabledArg = {
  disabled: {
    control: 'boolean',
    defaultValue: { summary: 'false' },
  },
};

export const errorArg = {
  error: {
    control: 'boolean',
    defaultValue: { summary: 'false' },
  },
};

export const loadingArg = {
  loading: {
    control: 'boolean',
    defaultValue: { summary: 'false' },
  },
};

export const valueArg = {
  value: {
    control: 'text',
    type: 'string',
    defaultValue: { summary: undefined },
  },
};

export const placeholderArg = {
  placeholder: {
    control: 'text',
    type: 'string',
    defaultValue: { summary: undefined },
  },
};

export const asArg = {
  as: {
    options: ['button', 'a'],
    control: 'radio',
    defaultValue: { summary: 'button' },
    description:
      'This parameter is used for demonstration purposes only. Switching between a button and a link is done via the `href` prop.',
    type: 'string',
  },
};

export const typeArg = {
  type: {
    options: ['button', 'reset', 'submit'],
    control: 'radio',
    defaultValue: { summary: undefined },
    type: 'string',
    if: { arg: 'as', eq: 'button' },
  },
};

export const onClickArg = {
  onClick: {
    defaultValue: { summary: undefined },
    type: '(event: Event) => void',
    if: { arg: 'as', eq: 'button' },
  },
};

export const hrefArg = {
  href: {
    control: 'text',
    defaultValue: { summary: undefined },
    if: { arg: 'as', eq: 'a' },
  },
};

export const buttonArg = {
  ...defaultArgs,
  ...textClassNameTypeArg,
  ...sizeArg,
  ...iconsArg,
  ...loadingArg,
  ...disabledArg,
  ...asArg,
  ...typeArg,
  ...onClickArg,
  ...hrefArg,
  theme: {
    options: ['filled', 'light', 'border', 'ghost'],
    control: { type: 'radio' },
    defaultValue: { summary: 'filled' },
  },
  color: {
    options: ['primary', 'secondary', 'success', 'danger'],
    control: { type: 'radio' },
    defaultValue: { summary: 'primary' },
  },
};

export const tagArg = {
  ...defaultArgs,
  ...textClassNameTypeArg,
  ...SMSizeArg,
  ...iconsArg,
  ...checkedArg,
  ...loadingArg,
  ...disabledArg,
  ...asArg,
  ...typeArg,
  ...onClickArg,
  ...hrefArg,
  theme: {
    options: ['light', 'border'],
    control: { type: 'radio' },
    defaultValue: { summary: 'light' },
  },
};

export const checkboxArg = {
  ...defaultArgs,
  ...wrapperClassNameTypeArg,
  ...textClassNameTypeArg,
  ...iconsArg,
  ...labelPlaceArg,
  ...SMSizeArg,
  ...checkedArg,
  ...disabledArg,
  ...valueArg,
  onChange: {
    control: 'object',
    defaultValue: { summary: undefined },
    type: '(checked: boolean, value: string, event: Event) => void',
  },
};

export const checkboxGroupArg = {
  ...classNameArg,
  ...SMSizeArg,
  ...disabledArg,
  defaultValue: {
    control: 'object',
    defaultValue: { summary: undefined },
    type: 'string[]',
  },
  onChange: {
    control: 'object',
    defaultValue: { summary: undefined },
    type: '(value: string[]) => void',
  },
};

export const radioArg = {
  ...defaultArgs,
  ...textClassNameTypeArg,
  ...iconsArg,
  ...SMSizeArg,
  ...checkedArg,
  ...disabledArg,
  ...valueArg,
  onChange: {
    control: 'object',
    defaultValue: { summary: undefined },
    type: '(checked: boolean, value: string, event: Event) => void',
  },
};

export const radioGroupArg = {
  ...classNameArg,
  ...SMSizeArg,
  ...disabledArg,
  defaultValue: {
    control: 'text',
    defaultValue: { summary: undefined },
  },
  onChange: {
    control: 'object',
    defaultValue: { summary: undefined },
    type: '(checked: boolean, value: string, event: Event) => void',
  },
};

export const tabArg = {
  ...classNameArg,
  ...textClassNameTypeArg,
  ...iconsArg,
  ...activeArg,
  ...disabledArg,
  ...asArg,
  ...typeArg,
  ...onClickArg,
  ...hrefArg,
  label: {
    control: 'text',
    defaultValue: { summary: undefined },
  },
};

export const fieldArg = {
  ...classNameArg,
  ...errorArg,
  label: {
    control: 'text',
    defaultValue: { summary: undefined },
  },
  description: {
    control: 'text',
    defaultValue: { summary: undefined },
  },
};

export const inputArg = {
  ...classNameArg,
  ...wrapperClassNameTypeArg,
  ...SMSizeArg,
  ...iconsArg,
  ...disabledArg,
  ...errorArg,
  ...valueArg,
  ...placeholderArg,
  button: {
    options: ['left', 'right'],
    control: 'radio',
    defaultValue: { summary: 'left' },
  },
  type: {
    options: ['text', 'number', 'email', 'password', 'url', 'tel', 'search', 'date', 'datetime-local', 'month', 'week', 'time'],
    control: 'select',
    defaultValue: { summary: 'text' },
    type: 'string',
  },
  onChange: {
    control: 'object',
    defaultValue: { summary: undefined },
    type: '(value: string, event: Event) => void',
  },
};

export const textareaArg = {
  ...classNameArg,
  ...wrapperClassNameTypeArg,
  ...SMSizeArg,
  ...disabledArg,
  ...errorArg,
  ...valueArg,
  ...placeholderArg,
  onChange: {
    control: 'object',
    defaultValue: { summary: undefined },
    type: '(value: string, event: Event) => void',
  },
};

export const headlineArg = {
  ...classNameArg,
  as: {
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    control: 'select',
    defaultValue: { summary: 'h1' },
    type: 'string',
  },
  children: {
    control: 'text',
    type: 'React.ReactNode',
    defaultValue: { summary: undefined },
  },
};

export const alertArg = {
  ...classNameArg,
  as: {
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    control: 'select',
    defaultValue: { summary: 'h3' },
    type: 'string',
  },
  headline: {
    control: 'text',
    defaultValue: { summary: undefined },
  },
  description: {
    control: 'text',
    defaultValue: { summary: undefined },
  },
  color: {
    options: ['primary', 'secondary', 'success', 'danger'],
    control: { type: 'radio' },
    defaultValue: { summary: 'primary' },
  },
};

export const containerArg = {
  ...classNameArg,
  children: {
    control: 'object',
    type: 'React.ReactNode',
    defaultValue: { summary: undefined },
  },
  size: {
    options: ['full', 'm', 's'],
    control: 'radio',
    defaultValue: { summary: 'full' },
  },
  leftAside: {
    control: 'boolean',
    defaultValue: { summary: undefined },
  },
  leftAsideClassName: {
    control: 'text',
    type: 'string',
    defaultValue: { summary: undefined },
  },
  rightAside: {
    control: 'boolean',
    defaultValue: { summary: undefined },
  },
  rightAsideClassName: {
    control: 'text',
    type: 'string',
    defaultValue: { summary: undefined },
  },
};

export const modalArg = {
  ...classNameArg,
  children: {
    control: 'object',
    type: 'React.ReactNode',
    defaultValue: { summary: undefined },
  },
  open: {
    control: 'boolean',
    defaultValue: { summary: undefined },
  },
  onClose: {
    control: 'object',
    defaultValue: { summary: undefined },
    type: '(value: boolean) => void',
  },
};
