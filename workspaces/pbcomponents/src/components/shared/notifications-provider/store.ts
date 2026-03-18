import type { NotificationInput, NotificationPayload, NotificationRecord } from '@/components/shared/notifications-provider/types';

interface NotificationsState {
  byId: Record<string, NotificationRecord>;
  order: string[];
}

type NotificationsAction =
  | { type: 'ADD'; payload: { id: string; notification: NotificationPayload } }
  | { type: 'CLOSE'; payload: { id: string } }
  | { type: 'REMOVE'; payload: { id: string } };

export const initialNotificationsState: NotificationsState = {
  byId: {},
  order: [],
};

export const normalizeNotificationPayload = (input: NotificationInput): NotificationPayload => {
  const payload = { ...input } as Record<string, unknown>;

  delete payload.id;
  delete payload.open;
  delete payload.defaultOpen;
  delete payload.isMouseInside;
  delete payload.ref;

  return payload as NotificationPayload;
};

export const notificationsReducer = (state: NotificationsState, action: NotificationsAction): NotificationsState => {
  switch (action.type) {
    case 'ADD': {
      const {
        payload: { id, notification },
      } = action;
      const now = Date.now();
      const currentNotification = state.byId[id];
      const order = [id, ...state.order.filter((orderId) => orderId !== id)];

      return {
        byId: {
          ...state.byId,
          [id]: {
            id,
            payload: notification,
            open: true,
            createdAt: currentNotification?.createdAt ?? now,
            updatedAt: now,
          },
        },
        order,
      };
    }
    case 'CLOSE': {
      const { id } = action.payload;
      const currentNotification = state.byId[id];
      if (!currentNotification || !currentNotification.open) return state;

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...currentNotification,
            open: false,
            updatedAt: Date.now(),
          },
        },
      };
    }
    case 'REMOVE': {
      const { id } = action.payload;
      const currentNotification = state.byId[id];
      if (!currentNotification) return state;

      const nextById = { ...state.byId };
      delete nextById[id];

      return {
        byId: nextById,
        order: state.order.filter((orderId) => orderId !== id),
      };
    }
    default:
      return state;
  }
};
