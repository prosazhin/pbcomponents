import type { NotificationProps } from '@/components/shared/notification';
import type { ReactNode } from 'react';

export type NotificationInput = Omit<NotificationProps, 'id' | 'open' | 'defaultOpen' | 'isMouseInside' | 'ref'> & { id?: string };
export type NotificationPayload = Omit<NotificationInput, 'id'>;

export interface NotificationRecord {
  id: string;
  payload: NotificationPayload;
  open: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface NotificationsContextProps {
  notifications: NotificationRecord[];
  showNotification: (value: NotificationInput) => string;
  hideNotification: (id: string) => void;
}

export interface NotificationsProviderProps {
  children: ReactNode;
  className?: string;
  top?: number;
  delay?: number;
  animationDuration?: number;
  estimatedNotificationHeight?: number;
  disableCloseByClickInsideAnywhere?: boolean;
  disableTimer?: boolean;
  disableTimerPauseOnContainerHover?: boolean;
  disableTimerPauseOnHover?: boolean;
  disableProgressBar?: boolean;
}
