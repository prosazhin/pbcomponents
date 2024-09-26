export type LabelPlaceType = { labelPlace?: 'right' | 'left' };
export type CheckedType = { checked?: boolean };
export type IndeterminateType = { indeterminate?: boolean };
export type LoadingType = { loading?: boolean };
export type DisabledType = { disabled?: boolean };
export type MediumType = { medium?: boolean };

export type SizeType = { size?: 'xs' | 's' | 'm' | 'l' };
export type SMLSizeType = { size?: 's' | 'm' | 'l' };
export type SMSizeType = { size?: 's' | 'm' };

export type ColorType = { color?: 'primary' | 'secondary' | 'success' | 'danger' };
export type ThemeType = { theme?: 'filled' | 'light' | 'border' | 'ghost' };

export type DivType = HTMLDivElement;
export type DivHTMLAttributes = React.HTMLAttributes<DivType>;

export type SpanType = HTMLSpanElement;
export type SpanHTMLAttributes = React.HTMLAttributes<SpanType>;

export type InputType = HTMLInputElement;
export type InputHTMLAttributes = React.HTMLAttributes<InputType>;

export type ButtonType = HTMLButtonElement;
export type ButtonHTMLAttributes = React.ButtonHTMLAttributes<HTMLElement>;

export type LinkType = HTMLAnchorElement;
export type LinkHTMLAttributes = React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonOrLinkType = ButtonType | LinkType;
export type ButtonOrLinkHTMLAttributes = React.HTMLAttributes<HTMLElement> & ButtonHTMLAttributes & LinkHTMLAttributes;

export type SvgType = React.ComponentType<
  React.ComponentProps<'svg'> & {
    title?: string | undefined | never;
    titleId?: string | undefined | never;
  }
>;

export type WithLeftIconType = { leftIcon?: SvgType | never };
export type WithRightIconType = { rightIcon?: SvgType | never };
export type WithIconsType = WithLeftIconType & WithRightIconType;

export type ComponentType = {
  children?: React.ReactNode;
  className?: string;
};

export type ComponentWrapperType<T> = {
  children?: T[];
  className?: string;
};
