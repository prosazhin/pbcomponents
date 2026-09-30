import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ChangeEvent,
  ComponentProps,
  ComponentType,
  ElementType,
  FieldsetHTMLAttributes,
  ForwardRefExoticComponent,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SVGProps,
  TextareaHTMLAttributes,
} from 'react';

export type SvgType =
  | ComponentType<SVGProps<SVGSVGElement> & { title?: string | undefined | never; titleId?: string | undefined | never }>
  | ForwardRefExoticComponent<SVGProps<SVGSVGElement> & { title?: string | undefined | never; titleId?: string | undefined | never }>;

export type WithIconsType = {
  leftIcon?: SvgType | never;
  leftIconClassName?: string;
  rightIcon?: SvgType | never;
  rightIconClassName?: string;
};

export type LabelPlaceType = { labelPlace?: 'right' | 'left' };
export type LoadingType = { loading?: boolean };
export type ErrorType = { error?: boolean };
export type MediumType = { medium?: boolean };
export type WrapperClassNameType = { wrapperClassName?: string };
export type TextClassNameType = { textClassName?: string };
// компонент для рендера ссылки вместо <a> — например NextLink в Next-проектах
export type LinkComponentType = { linkComponent?: ElementType };

export type SizeType = { size?: 'xs' | 's' | 'm' | 'l' };
export type SMSizeType = { size?: 's' | 'm' };
// шкала размеров шрифта из .content в фигме
export type TextSize = 10 | 12 | 14 | 16 | 20 | 24 | 32;
export type TextSizeType = { size?: TextSize };
export type IconSize = 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 32;
export type IconSizeType = { size?: IconSize };

export type ColorType = { color?: 'primary' | 'secondary' | 'success' | 'danger' };
export type ColorWithWarningType = { color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' };
export type ThemeType = { theme?: 'filled' | 'light' | 'border' | 'ghost' };

export type ButtonOrLinkType = HTMLButtonElement | HTMLAnchorElement;
export type ButtonOrLinkHTMLAttrs = HTMLAttributes<HTMLElement> & ButtonHTMLAttributes<HTMLElement> & AnchorHTMLAttributes<HTMLElement>;

export type InputType = HTMLInputElement;
export type InputHTMLAttrs = InputHTMLAttributes<HTMLElement>;
export type InputEvent = ChangeEvent<InputType>;

export type LabelType = HTMLLabelElement;
export type LabelHTMLAttrs = LabelHTMLAttributes<HTMLElement>;

export type FieldSetType = HTMLFieldSetElement;
export type FieldSetHTMLAttrs = FieldsetHTMLAttributes<HTMLElement>;

export type TextareaType = HTMLTextAreaElement;
export type TextareaHTMLAttrs = TextareaHTMLAttributes<HTMLElement>;
export type TextareaEvent = ChangeEvent<TextareaType>;

export type OptionType<T> = { display: string; value?: string; disabled?: boolean; badge?: T };

export type PolymorphicProps<Element extends ElementType, Props> = Props & Omit<ComponentProps<Element>, 'as'> & { as?: Element };
