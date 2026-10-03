'use client';

import InlineRadio, { InlineRadioProps } from '@/components/shared/inline-radio';
import useControllableState from '@/hooks/use-controllable-state';
import { FieldSetHTMLAttrs, FieldSetType, InputType, SMSizeType } from '@/types';
import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'motion/react';
import { ReactElement, Ref, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

type BaseInlineRadioGroupProps = Omit<FieldSetHTMLAttrs, 'onChange' | 'children'> & SMSizeType;
export interface InlineRadioGroupProps extends BaseInlineRadioGroupProps {
  children: ReactElement<InlineRadioProps>[];
  rounded?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  ref?: Ref<FieldSetType>;
}

const InlineRadioGroup = (props: InlineRadioGroupProps) => {
  const {
    size = 'm',
    rounded = false,
    value: externalValue,
    defaultValue,
    onChange,
    children: childn,
    className,
    ref: externalRef,
    ...rest
  } = props;
  const { name, disabled } = rest;

  const [activeValue, setActiveValue] = useControllableState<string>({
    value: externalValue,
    defaultValue,
    onChange,
  });
  const [indicatorStyle, setIndicatorStyle] = useState<{ x: number; width: number } | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  const optionsRef = useRef<HTMLDivElement>(null);
  const radioRefs = useRef<(InputType | null)[]>([]);

  const children = useMemo(() => (childn ? [...childn] : []), [childn]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const optionsElement = optionsRef.current;

    const updateIndicator = () => {
      const activeIndex = children.findIndex(({ props: itemProps }) => activeValue === (itemProps.value ?? itemProps.children ?? ''));
      const activeInput = activeIndex >= 0 ? radioRefs.current[activeIndex] : null;
      const activeOption = activeInput?.parentElement;

      if (!optionsElement || !activeOption) {
        setIndicatorStyle(null);

        return;
      }

      setIndicatorStyle({ x: activeOption.offsetLeft, width: activeOption.offsetWidth });
    };

    updateIndicator();

    if (typeof ResizeObserver !== 'undefined' && optionsElement) {
      const observer = new ResizeObserver(updateIndicator);

      observer.observe(optionsElement);
      radioRefs.current.forEach((radio) => radio?.parentElement && observer.observe(radio.parentElement));

      return () => observer.disconnect();
    }

    window.addEventListener('resize', updateIndicator);

    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeValue, children]);

  if (!children.length) return null;

  return (
    <fieldset
      {...rest}
      ref={externalRef}
      className={clsx(
        'pbc pbc:relative pbc:w-fit pbc:max-w-full pbc:min-w-0 pbc:bg-secondary-100 pbc:p-4! pbc:appearance-none',
        rounded && 'pbc:rounded-999',
        !rounded && size === 's' && 'pbc:rounded-8',
        !rounded && size === 'm' && 'pbc:rounded-12',
        className,
      )}
    >
      <div
        ref={optionsRef}
        className='pbc pbc:relative pbc:gap-4 pbc:inline-flex pbc:max-w-full pbc:flex-row pbc:flex-nowrap pbc:items-center pbc:overflow-x-auto'
      >
        {indicatorStyle && (
          <LazyMotion features={domAnimation}>
            <m.div
              className={clsx(
                'pbc:absolute pbc:left-0 pbc:z-0 pbc:bg-basic-0',
                'pbc:top-0 pbc:bottom-0',
                rounded && 'pbc:rounded-999',
                !rounded && size === 's' && 'pbc:rounded-6',
                !rounded && size === 'm' && 'pbc:rounded-8',
              )}
              initial={false}
              animate={{ x: indicatorStyle.x, width: indicatorStyle.width }}
              transition={mounted ? { duration: 0.2, ease: 'easeInOut' } : { duration: 0 }}
            />
          </LazyMotion>
        )}
        {children.map(({ props: itemProps }, index) => (
          <InlineRadio
            {...itemProps}
            key={index}
            name={name ?? itemProps.name}
            size={size}
            checked={activeValue === (itemProps.value ?? itemProps.children ?? '')}
            indicator={false}
            rounded={rounded}
            disabled={disabled || itemProps.disabled}
            ref={(value) => {
              radioRefs.current[index] = value;
            }}
            onChange={(_, value) => setActiveValue(value)}
          />
        ))}
      </div>
    </fieldset>
  );
};

InlineRadioGroup.displayName = 'InlineRadioGroup';
export default InlineRadioGroup;
