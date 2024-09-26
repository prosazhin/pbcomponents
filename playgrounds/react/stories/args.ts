import * as heroicons from '@heroicons/react/24/solid';

export const childrenArg = {
  children: {
    control: 'text',
    type: 'React.ReactNode',
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

export const leftIcon = { ...iconArg };
export const rightIcon = { ...iconArg };

export const iconsArg = {
  leftIcon,
  rightIcon,
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

export const loadingArg = {
  loading: {
    control: 'boolean',
    defaultValue: { summary: 'false' },
  },
};

export const typeArg = {
  type: {
    control: 'text',
    defaultValue: { summary: undefined },
  },
};

export const onClickArg = {
  onClick: {
    defaultValue: { summary: undefined },
    type: '(event) => void',
  },
};

export const hrefArg = {
  href: {
    control: 'text',
    defaultValue: { summary: undefined },
  },
};

export const inputCheckboxArg = {
  onChange: {
    defaultValue: { summary: undefined },
    type: '(event) => void',
  },
};
