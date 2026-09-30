'use client';

import Button, { ButtonProps } from '@/components/shared/button';
import useControllableState from '@/hooks/use-controllable-state';
import useMergeRefs from '@/hooks/use-merge-refs';
import useScreenSize from '@/hooks/use-screen-size';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { LazyMotion, PanInfo, domMax, m, useDragControls } from 'motion/react';
import {
  Children,
  DialogHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

// ширина экрана, до которой окно открывается шторкой снизу (breakpoint mobile из pbstyles)
const MOBILE_MAX_WIDTH = 768;
// на сколько окно поднимается при появлении на десктопе
const DESKTOP_OFFSET = 16;
// шторка закрывается, если её утянули вниз больше чем на эту долю высоты или смахнули быстрее этой скорости
const SWIPE_CLOSE_RATIO = 0.25;
const SWIPE_CLOSE_VELOCITY = 500;

type BaseDialogProps = Omit<DialogHTMLAttributes<HTMLDialogElement>, 'onClose' | 'id' | 'children'>;
export interface DialogProps extends BaseDialogProps {
  id: string;
  open?: boolean;
  defaultOpen?: boolean;
  backdrop?: boolean;
  animationDuration?: number;
  children?: ReactNode;
  onOpenChange?: (value: boolean, id?: string) => void;
  onClose?: (value: boolean, id?: string) => void;
  ref?: Ref<HTMLDialogElement>;
}

export interface DialogTriggerProps extends Omit<ButtonProps, 'type'> {}

export interface DialogContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
}

export interface DialogSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
}

export interface DialogCloseProps extends Omit<ButtonProps, 'type'> {}

const DialogTrigger = (props: DialogTriggerProps) => {
  void props;

  return null;
};
DialogTrigger.displayName = 'Dialog.Trigger';

const DialogContent = (props: DialogContentProps) => {
  void props;

  return null;
};
DialogContent.displayName = 'Dialog.Content';

const DialogHeader = (props: DialogSectionProps) => {
  void props;

  return null;
};
DialogHeader.displayName = 'Dialog.Header';

const DialogBody = (props: DialogSectionProps) => {
  void props;

  return null;
};
DialogBody.displayName = 'Dialog.Body';

const DialogFooter = (props: DialogSectionProps) => {
  void props;

  return null;
};
DialogFooter.displayName = 'Dialog.Footer';

const DialogClose = (props: DialogCloseProps) => {
  void props;

  return null;
};
DialogClose.displayName = 'Dialog.Close';

const Dialog = (props: DialogProps) => {
  const {
    id,
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
    onClose = () => {},
    backdrop = true,
    children,
    className,
    animationDuration = 200,
    ref: externalRef,
    ...rest
  } = props;
  const internalRef = useRef<HTMLDialogElement>(null);
  const ref = useMergeRefs(internalRef, externalRef);
  const isControlled = controlledOpen !== undefined;
  const wasOpenRef = useRef<boolean>(controlledOpen ?? defaultOpen ?? false);
  const onCloseRef = useRef(onClose);

  const [stateOpen, setStateOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen ?? false,
    onChange: (value) => onOpenChange?.(value, id),
  });
  const open = (isControlled ? controlledOpen : stateOpen) ?? false;

  // на мобильном окно — шторка снизу, которую можно смахнуть вниз за полоску сверху
  const { width: screenWidth } = useScreenSize();
  const isMobile = screenWidth <= MOBILE_MAX_WIDTH;
  const dragControls = useDragControls();
  const panelRef = useRef<HTMLDivElement>(null);

  const requestOpen = useCallback(() => {
    setStateOpen(true);
  }, [setStateOpen]);

  const requestClose = useCallback(() => {
    setStateOpen(false);
  }, [setStateOpen]);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const node = internalRef.current;
    if (!node) return;

    const handleNativeClose = () => {
      if (!open) return;
      requestClose();
    };

    node.addEventListener('close', handleNativeClose);

    return () => {
      node.removeEventListener('close', handleNativeClose);
    };
  }, [open, requestClose]);

  useEffect(() => {
    const node = internalRef.current;
    if (!node) return;

    let closeTimer: ReturnType<typeof setTimeout> | null = null;
    const wasOpen = wasOpenRef.current;

    if (open) {
      if (!node.open) {
        try {
          node.showModal();
        } catch {
          node.show();
        }
        // showModal сам ставит фокус на первый элемент внутри (кнопку закрытия) — переводим его на само окно
        node.focus({ preventScroll: true });
      }
    } else if (wasOpen) {
      closeTimer = setTimeout(() => {
        if (node.open) {
          node.close();
        }
        onCloseRef.current(false, id);
      }, animationDuration);
    }

    wasOpenRef.current = open;

    return () => {
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [animationDuration, id, open]);

  const { triggerProps, contentProps, headerProps, bodyProps, footerProps, closeProps } = useMemo<{
    triggerProps: DialogTriggerProps | null;
    contentProps: DialogContentProps | null;
    headerProps: DialogSectionProps | null;
    bodyProps: DialogSectionProps | null;
    footerProps: DialogSectionProps | null;
    closeProps: DialogCloseProps | null;
  }>(() => {
    let nextTriggerProps: DialogTriggerProps | null = null;
    let nextContentProps: DialogContentProps | null = null;

    const fallbackContentChildren: ReactNode[] = [];

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) {
        if (child !== null && child !== undefined) fallbackContentChildren.push(child);

        return;
      }

      if (child.type === DialogTrigger) {
        nextTriggerProps = (child as ReactElement<DialogTriggerProps>).props;

        return;
      }

      if (child.type === DialogContent) {
        nextContentProps = (child as ReactElement<DialogContentProps>).props;

        return;
      }

      fallbackContentChildren.push(child);
    });

    if (!nextContentProps && fallbackContentChildren.length) {
      nextContentProps = { children: fallbackContentChildren };
    }

    let nextHeaderProps: DialogSectionProps | null = null;
    let nextBodyProps: DialogSectionProps | null = null;
    let nextFooterProps: DialogSectionProps | null = null;
    let nextCloseProps: DialogCloseProps | null = null;

    const fallbackBodyChildren: ReactNode[] = [];

    Children.forEach(nextContentProps?.children, (child) => {
      if (!isValidElement(child)) {
        if (child !== null && child !== undefined) fallbackBodyChildren.push(child);

        return;
      }

      if (child.type === DialogHeader) {
        nextHeaderProps = (child as ReactElement<DialogSectionProps>).props;

        return;
      }

      if (child.type === DialogBody) {
        nextBodyProps = (child as ReactElement<DialogSectionProps>).props;

        return;
      }

      if (child.type === DialogFooter) {
        nextFooterProps = (child as ReactElement<DialogSectionProps>).props;

        return;
      }

      if (child.type === DialogClose) {
        nextCloseProps = (child as ReactElement<DialogCloseProps>).props;

        return;
      }

      fallbackBodyChildren.push(child);
    });

    if (!nextBodyProps && fallbackBodyChildren.length) {
      nextBodyProps = { children: fallbackBodyChildren };
    }

    return {
      triggerProps: nextTriggerProps,
      contentProps: nextContentProps,
      headerProps: nextHeaderProps,
      bodyProps: nextBodyProps,
      footerProps: nextFooterProps,
      closeProps: nextCloseProps,
    };
  }, [children]);

  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    const height = panelRef.current?.offsetHeight ?? 0;

    if (info.offset.y > height * SWIPE_CLOSE_RATIO || info.velocity.y > SWIPE_CLOSE_VELOCITY) {
      requestClose();
    }
  };

  const hiddenState = isMobile ? { opacity: 1, y: '100%' } : { opacity: 0, y: DESKTOP_OFFSET };
  const enterTransition = { duration: animationDuration / 1000, ease: open ? 'easeOut' : 'easeIn' } as const;

  return (
    <>
      {triggerProps && (
        <Button
          {...triggerProps}
          type='button'
          onClick={(event) => {
            triggerProps.onClick?.(event);
            requestOpen();
          }}
        />
      )}
      <LazyMotion features={domMax}>
        <dialog
          {...rest}
          ref={ref}
          id={id}
          tabIndex={-1}
          className='pbc pbc-dialog pbc:outline-none pbc:fixed pbc:size-full pbc:inset-0 pbc:m-0 pbc:p-0 pbc:border-0 pbc:bg-transparent pbc:max-w-none pbc:max-h-none pbc:overflow-hidden'
          onCancel={(event) => {
            rest.onCancel?.(event);
            event.preventDefault();
            requestClose();
          }}
        >
          <m.div
            className='pbc:fixed pbc:size-full pbc:inset-0 pbc:m-auto pbc:p-0 pbc:flex pbc:pointer-events-none pbc:desktop:items-center pbc:items-end pbc:justify-end pbc:desktop:justify-center'
            initial={false}
            animate={{ zIndex: open ? 500 : -1 }}
            // слой меняем мгновенно: при закрытии — после того, как доиграет анимация окна
            transition={{ duration: 0, delay: open ? 0 : animationDuration / 1000 }}
          >
            <m.div
              className={clsx(
                'pbc:absolute pbc:size-full pbc:inset-0 pbc:z-1 pbc:pointer-events-auto',
                // затемнение должно быть тёмным в обеих темах, а семантические токены в тёмной теме инвертируются
                // (basic-400 там белый) — поэтому исключение из правила: константа палитры pbstyles
                backdrop ? 'pbc:bg-gray-blue-900/50' : 'pbc:bg-transparent',
              )}
              initial={false}
              animate={{ opacity: open ? 1 : 0 }}
              transition={enterTransition}
              onClick={requestClose}
            />
            <m.div
              className={clsx(
                'pbc pbc:relative pbc:z-10 pbc:mx-auto pbc:desktop:m-auto pbc:box-border pbc:pointer-events-auto',
                'pbc:w-full pbc:desktop:w-736 pbc:max-w-full pbc:max-h-[calc(100dvh-40px)] pbc:desktop:max-h-[calc(100dvh-160px)]',
                'pbc:flex pbc:flex-col pbc:overflow-hidden',
                'pbc:bg-basic-0 pbc:text-text-primary pbc:rounded-t-16 pbc:desktop:rounded-16 pbc:shadow-xxxxl pbc:inset-ring pbc:inset-ring-secondary-200',
                className,
                contentProps?.className,
              )}
              role={contentProps?.role}
              style={{ willChange: 'transform', ...contentProps?.style }}
              ref={panelRef}
              initial={false}
              animate={open ? { opacity: 1, y: 0 } : hiddenState}
              transition={enterTransition}
              drag={isMobile && open ? 'y' : false}
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 1 }}
              onDragEnd={handleDragEnd}
            >
              {/* зона с полоской сверху у мобильной шторки: за неё окно тянут вниз, чтобы закрыть */}
              <div
                className='pbc:absolute pbc:top-0 pbc:inset-x-64 pbc:z-10 pbc:flex pbc:h-40 pbc:justify-center pbc:pt-16 pbc:cursor-grab pbc:touch-none pbc:active:cursor-grabbing pbc:desktop:hidden'
                onPointerDown={(event) => dragControls.start(event)}
              >
                <div className='pbc:h-6 pbc:w-40 pbc:rounded-999 pbc:bg-secondary-200' />
              </div>
              <Button
                {...closeProps}
                size={closeProps?.size ?? 'm'}
                theme={closeProps?.theme ?? 'ghost'}
                color={closeProps?.color ?? 'secondary'}
                leftIcon={closeProps?.leftIcon ?? XMarkIcon}
                className={clsx('pbc:absolute! pbc:top-8 pbc:right-8 pbc:z-10 pbc:w-auto!', closeProps?.className)}
                onClick={(event) => {
                  closeProps?.onClick?.(event);
                  requestClose();
                }}
              >
                {closeProps?.children}
              </Button>
              <div className='pbc pbc-scrollbar-hidden pbc:min-h-0 pbc:flex-1 pbc:overflow-x-hidden pbc:overflow-y-auto pbc:px-24 pbc:pt-64 pbc:pb-40 pbc:desktop:p-80'>
                {headerProps?.children && <div className={clsx('pbc:w-full pbc:mb-24', headerProps.className)}>{headerProps.children}</div>}
                {bodyProps?.children && <div className={clsx('pbc:w-full', bodyProps.className)}>{bodyProps.children}</div>}
                {footerProps?.children && <div className={clsx('pbc:w-full pbc:mt-24', footerProps.className)}>{footerProps.children}</div>}
              </div>
            </m.div>
          </m.div>
        </dialog>
      </LazyMotion>
    </>
  );
};

Dialog.displayName = 'Dialog';

const DialogCompound: typeof Dialog & {
  Trigger: typeof DialogTrigger;
  Content: typeof DialogContent;
  Header: typeof DialogHeader;
  Body: typeof DialogBody;
  Footer: typeof DialogFooter;
  Close: typeof DialogClose;
} = Object.assign(Dialog, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
});

export default DialogCompound;
