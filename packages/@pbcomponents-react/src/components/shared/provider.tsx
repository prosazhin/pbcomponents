import { DialogProvider } from '@/components/shared/dialog/provider';
import { NotificationProvider } from '@/components/shared/notification/provider';

export interface PBCProviderProps {
  children: React.ReactNode;
  notificationTop?: number;
}

const PBCProvider = (props: PBCProviderProps) => {
  const { children, notificationTop } = props;

  return (
    <NotificationProvider top={notificationTop}>
      <DialogProvider>{children}</DialogProvider>
    </NotificationProvider>
  );
};

export default PBCProvider;
