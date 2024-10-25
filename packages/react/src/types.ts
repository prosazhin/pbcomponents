export type SvgType = React.ComponentType<
  React.ComponentProps<'svg'> & {
    title?: string | undefined | never;
    titleId?: string | undefined | never;
  }
>;

export type WithLeftIconType = {
  leftIcon?: SvgType | never;
  leftIconClassName?: string;
};
export type WithRightIconType = {
  rightIcon?: SvgType | never;
  rightIconClassName?: string;
};
export type WithIconsType = WithLeftIconType & WithRightIconType;

export type LabelPlaceType = { labelPlace?: 'right' | 'left' };
export type LoadingType = { loading?: boolean };
export type ErrorType = { error?: boolean };
export type MediumType = { medium?: boolean };
export type WrapperClassNameType = { wrapperClassName?: string };
export type TextClassNameType = { textClassName?: string };

export type SizeType = { size?: 'xs' | 's' | 'm' | 'l' };
export type SMLSizeType = { size?: 's' | 'm' | 'l' };
export type SMSizeType = { size?: 's' | 'm' };

export type ColorType = { color?: 'primary' | 'secondary' | 'success' | 'danger' };
export type ThemeType = { theme?: 'filled' | 'light' | 'border' | 'ghost' };

export type HeadlineType = HTMLHeadingElement;
export type HeadlineHTMLAttrs = React.HTMLAttributes<HeadlineType>;

export type SpanType = HTMLSpanElement;
export type SpanHTMLAttrs = React.HTMLAttributes<SpanType>;

export type DivType = HTMLDivElement;
export type DivHTMLAttrs = React.HTMLAttributes<DivType>;

export type ButtonType = HTMLButtonElement;
export type ButtonHTMLAttrs = React.ButtonHTMLAttributes<HTMLElement>;

export type LinkType = HTMLAnchorElement;
export type LinkHTMLAttrs = React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonOrLinkType = ButtonType | LinkType;
export type ButtonOrLinkHTMLAttrs = React.HTMLAttributes<HTMLElement> & ButtonHTMLAttrs & LinkHTMLAttrs;

export type InputType = HTMLInputElement;
export type InputHTMLAttrs = React.InputHTMLAttributes<HTMLElement>;
export type InputEvent = React.ChangeEvent<HTMLInputElement>;

export type LabelType = HTMLLabelElement;
export type LabelHTMLAttrs = React.LabelHTMLAttributes<HTMLElement>;

export type FieldSetType = HTMLFieldSetElement;
export type FieldSetHTMLAttrs = React.FieldsetHTMLAttributes<HTMLElement>;

export type TextareaType = HTMLTextAreaElement;
export type TextareaHTMLAttrs = React.TextareaHTMLAttributes<HTMLElement>;
export type TextareaEvent = React.ChangeEvent<HTMLTextAreaElement>;

export type DetailsType = HTMLDetailsElement;
export type DetailsHTMLAttrs = React.DetailsHTMLAttributes<HTMLElement>;
// export type TextareasdfsdfEvent = React.to;

export type PolymorphicProps<Element extends React.ElementType, Props> = Props &
  Omit<React.ComponentProps<Element>, 'as'> & {
    as?: Element;
  };
