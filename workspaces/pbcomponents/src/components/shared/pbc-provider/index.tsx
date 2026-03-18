import { DialogProvider, type DialogProviderProps } from '@/components/shared/dialog-provider';
import NotificationsProvider, { type NotificationsProviderProps } from '@/components/shared/notifications-provider';
import { type ReactNode } from 'react';

export interface PBCProviderProps {
  children: ReactNode;
  notifications?: Omit<NotificationsProviderProps, 'children'>;
  dialog?: Omit<DialogProviderProps, 'children'>;
}

const PBCProvider = (props: PBCProviderProps) => {
  const { children, notifications, dialog } = props;

  return (
    <NotificationsProvider {...notifications}>
      <DialogProvider {...dialog}>{children}</DialogProvider>
    </NotificationsProvider>
  );
};

PBCProvider.displayName = 'PBCProvider';
export default PBCProvider;
