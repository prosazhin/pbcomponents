'use client';

import Notification, { NotificationProps } from '@/components/shared/notification';
import {
  initialNotificationsState,
  normalizeNotificationPayload,
  notificationsReducer,
} from '@/components/shared/notifications-provider/store';
import type {
  NotificationInput,
  NotificationRecord,
  NotificationsContextProps,
  NotificationsProviderProps,
} from '@/components/shared/notifications-provider/types';
import useHoverControllable from '@/hooks/use-hover-controllable';
import useKeydown from '@/hooks/use-keydown';
import useMergeRefs from '@/hooks/use-merge-refs';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';

const NOTIFICATION_GAP = 8;
const DEFAULT_NOTIFICATION_ESTIMATED_HEIGHT = 80;

const NotificationsContext = createContext<NotificationsContextProps | null>(null);

const isEditableElement = (target: EventTarget | Element | null) => {
  if (!(target instanceof HTMLElement)) return false;

  const tagName = target.tagName;
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return true;

  return target.isContentEditable;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider');
  }

  return context;
};

const NotificationsProvider = (props: NotificationsProviderProps) => {
  const {
    children,
    className,
    top = 0,
    delay = 5000,
    animationDuration = 200,
    estimatedNotificationHeight = DEFAULT_NOTIFICATION_ESTIMATED_HEIGHT,
    disableCloseByClickInsideAnywhere,
    disableTimer = false,
    disableTimerPauseOnContainerHover = false,
    disableTimerPauseOnHover = false,
    disableProgressBar,
  } = props;
  const resolvedEstimatedNotificationHeight =
    Number.isFinite(estimatedNotificationHeight) && estimatedNotificationHeight > 0
      ? estimatedNotificationHeight
      : DEFAULT_NOTIFICATION_ESTIMATED_HEIGHT;

  const [state, dispatch] = useReducer(notificationsReducer, initialNotificationsState);
  const [notificationHeights, setNotificationHeights] = useState<Record<string, number>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const notificationNodesRef = useRef<Record<string, HTMLDialogElement | null>>({});
  const notificationNodeRefsRef = useRef<Record<string, (node: HTMLDialogElement | null) => void>>({});
  const resizeObserversRef = useRef<Record<string, ResizeObserver>>({});

  const [isContainerHovered, , containerHoverRef] = useHoverControllable({
    defaultValue: false,
    enabled: !disableTimerPauseOnContainerHover,
  });
  const mergedContainerRef = useMergeRefs(containerRef, containerHoverRef);

  const notifications = useMemo(
    () => state.order.map((id) => state.byId[id]).filter((notification): notification is NotificationRecord => notification !== undefined),
    [state.byId, state.order],
  );

  const showNotification = useCallback((notificationInput: NotificationInput) => {
    const externalId = notificationInput.id;
    const id = externalId ?? nanoid();

    dispatch({
      type: 'ADD',
      payload: {
        id,
        notification: normalizeNotificationPayload(notificationInput),
      },
    });

    return id;
  }, []);

  const hideNotification = useCallback((id: string) => {
    dispatch({
      type: 'CLOSE',
      payload: { id },
    });
  }, []);

  const removeNotification = useCallback((id: string) => {
    dispatch({
      type: 'REMOVE',
      payload: { id },
    });
  }, []);

  const invokeNotificationCallback = useCallback(
    (callback: ((value: boolean, id?: string) => void) | undefined, value: boolean, notificationId: string) => {
      if (!callback) return;

      try {
        callback(value, notificationId);
      } catch {
        // ignore notification callback failures
      }
    },
    [],
  );

  const setNotificationNode = useCallback((id: string, node: HTMLDialogElement | null) => {
    const previousNode = notificationNodesRef.current[id];
    if (previousNode === node) return;

    if (resizeObserversRef.current[id]) {
      resizeObserversRef.current[id].disconnect();
      delete resizeObserversRef.current[id];
    }

    if (node === null) {
      delete notificationNodesRef.current[id];

      return;
    }

    notificationNodesRef.current[id] = node;

    const measure = () => {
      const nextHeight = Math.ceil(node.getBoundingClientRect().height);

      setNotificationHeights((currentHeights) => {
        if (currentHeights[id] === nextHeight) return currentHeights;

        return {
          ...currentHeights,
          [id]: nextHeight,
        };
      });
    };

    measure();

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        measure();
      });

      resizeObserver.observe(node);
      resizeObserversRef.current[id] = resizeObserver;
    }
  }, []);

  const getNotificationNodeRef = useCallback(
    (id: string) => {
      const existingRef = notificationNodeRefsRef.current[id];
      if (existingRef) return existingRef;

      const nodeRef = (node: HTMLDialogElement | null) => {
        setNotificationNode(id, node);
      };

      notificationNodeRefsRef.current[id] = nodeRef;

      return nodeRef;
    },
    [setNotificationNode],
  );

  const contextValue = useMemo<NotificationsContextProps>(
    () => ({
      notifications,
      showNotification,
      hideNotification,
    }),
    [hideNotification, notifications, showNotification],
  );

  const notificationTopById = useMemo(() => {
    let offset = top;
    const nextTopById: Record<string, number> = {};

    notifications.forEach((notification) => {
      nextTopById[notification.id] = offset;
      offset += (notificationHeights[notification.id] ?? resolvedEstimatedNotificationHeight) + NOTIFICATION_GAP;
    });

    return nextTopById;
  }, [notifications, notificationHeights, resolvedEstimatedNotificationHeight, top]);

  useKeydown({
    keys: ['Escape'],
    callback: (event) => {
      const activeElement = typeof document !== 'undefined' ? document.activeElement : null;
      if (isEditableElement(event.target) || isEditableElement(activeElement)) return;

      const topOpenedNotification = notifications.find((notification) => notification.open);
      if (!topOpenedNotification) return;

      hideNotification(topOpenedNotification.id);
    },
  });

  useEffect(() => {
    return () => {
      Object.values(resizeObserversRef.current).forEach((resizeObserver) => {
        resizeObserver.disconnect();
      });
      resizeObserversRef.current = {};
      notificationNodesRef.current = {};
      notificationNodeRefsRef.current = {};
    };
  }, []);

  useEffect(() => {
    const currentIds = new Set(notifications.map((notification) => notification.id));

    Object.keys(notificationNodesRef.current).forEach((id) => {
      if (currentIds.has(id)) return;

      if (resizeObserversRef.current[id]) {
        resizeObserversRef.current[id].disconnect();
        delete resizeObserversRef.current[id];
      }

      delete notificationNodesRef.current[id];
      delete notificationNodeRefsRef.current[id];
    });

    setNotificationHeights((currentHeights) => {
      let hasChanges = false;
      const nextHeights = { ...currentHeights };

      Object.keys(nextHeights).forEach((id) => {
        if (currentIds.has(id)) return;

        hasChanges = true;
        delete nextHeights[id];
      });

      return hasChanges ? nextHeights : currentHeights;
    });
  }, [notifications]);

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
      <div
        ref={mergedContainerRef}
        className={clsx(
          'pbc:fixed pbc:top-0 pbc:right-16 pbc:z-900 pbc:w-[calc(100%-32px)] pbc:desktop:w-400 pbc:bg-transparent',
          className,
        )}
        aria-live='assertive'
        id='pbc-notifications-provider'
      >
        {notifications.map((notification) => {
          const resolvedNotificationProps: NotificationProps = {
            ...notification.payload,
            id: notification.id,
            open: notification.open,
            top: notificationTopById[notification.id],
            delay: notification.payload.delay ?? delay,
            animationDuration: notification.payload.animationDuration ?? animationDuration,
            disableCloseByClickInsideAnywhere: notification.payload.disableCloseByClickInsideAnywhere ?? disableCloseByClickInsideAnywhere,
            disableTimer: notification.payload.disableTimer ?? disableTimer,
            disableTimerPauseOnHover: notification.payload.disableTimerPauseOnHover ?? disableTimerPauseOnHover,
            disableProgressBar: notification.payload.disableProgressBar ?? disableProgressBar,
          };

          return (
            <Notification
              key={notification.id}
              ref={getNotificationNodeRef(notification.id)}
              {...resolvedNotificationProps}
              className={clsx('pbc:absolute pbc:right-0 pbc:m-0', notification.payload.className)}
              isMouseInside={!disableTimerPauseOnContainerHover ? isContainerHovered : undefined}
              onOpenChange={(value, id) => {
                const resolvedId = id ?? notification.id;
                invokeNotificationCallback(notification.payload.onOpenChange, value, resolvedId);

                if (!value) {
                  hideNotification(resolvedId);
                }
              }}
              onClose={(value, id) => {
                const resolvedId = id ?? notification.id;
                invokeNotificationCallback(notification.payload.onClose, value, resolvedId);

                if (!value) {
                  removeNotification(resolvedId);
                }
              }}
            />
          );
        })}
      </div>
    </NotificationsContext.Provider>
  );
};

NotificationsProvider.displayName = 'NotificationsProvider';
export default NotificationsProvider;
