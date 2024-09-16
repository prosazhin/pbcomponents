import { PolymorphicComponentPropsWithRef, WithIconsType } from '@/types';
import clsx from 'clsx';

import Content from '@/components/helpers/content';

export type Props<T extends React.ElementType = 'input'> = PolymorphicComponentPropsWithRef<
  T,
  WithIconsType & {
    label: string;
    size?: 's' | 'm';
    checked?: boolean | never;
    disabled?: boolean | never;
    onChange?: (value: boolean) => void;
  }
>;

const InlineRadioItem = <T extends React.ElementType = 'input'>({
  className,
  leftIcon,
  rightIcon,
  label,
  checked = false,
  onChange = () => {},
  size = 'm',
  disabled,
  ...rest
}: Props<T>) => (
  <label
    className={clsx(
      'pbc pbc-flex-inline pbc-transition-colors pbc-bg-transparent pbc-text-basic-main pbc-cursor-pointer',
      'hover:pbc-bg-white/60 hover:pbc-text-primary-main',
      checked && !disabled && 'pbc-bg-white pbc-text-primary-darker',
      disabled && '!pbc-bg-transparent !pbc-text-basic-light !pbc-cursor-default',
      size === 's' && 'pbc-px-12 pbc-py-4 pbc-rounded-6',
      size === 'm' && 'pbc-px-16 pbc-py-8 pbc-rounded-8',
      className,
    )}
    {...rest}
  >
    <input
      type='radio'
      checked={checked}
      disabled={disabled}
      className='pbc pbc-hidden'
      {...rest}
      onChange={(event) => onChange(event.target.checked)}
    />
    <Content size={size} leftIcon={leftIcon} rightIcon={rightIcon} medium={true}>
      {label}
    </Content>
  </label>
);

export default InlineRadioItem;
