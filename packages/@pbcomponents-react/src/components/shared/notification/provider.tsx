'use client';

import Notification, { NotificationProps } from '@/components/shared/notification';
import { DialogType } from '@/types';
import { createContext, useContext, useRef, useState } from 'react';

export interface NotificationContextProps {
  notifications: NotificationProps[];
  showNotification: (value: NotificationProps) => void;
}

const NotificationContext = createContext<NotificationContextProps>(null!);

export interface NotificationProviderProps {
  children: React.ReactNode;
  top?: number;
}

export const NotificationProvider = (props: NotificationProviderProps) => {
  const { children, top = 0 } = props;
  const [list, setList] = useState<NotificationProps[]>([]);
  const [id, setId] = useState<number>(0);
  const refs = useRef<DialogType[]>([]);

  const showNotification = (value: NotificationProps) => {
    setList([
      ...list,
      {
        ...value,
        open: true,
        id: String(id),
      },
    ]);
    setId(id + 1);
  };

  return (
    <NotificationContext.Provider value={{ notifications: list, showNotification }}>
      {children}
      <div
        className='pbc-fixed pbc-z-[999] pbc-inset-0 pbc-m-auto pbc-px-0 desktop:pbc-px-16 pbc-pointer-events-none'
        aria-live='assertive'
      >
        <div className='pbc-relative pbc-w-full'>
          {list.map((notification) => {
            let notificationTop = top;
            const filteredRefs =
              refs.current.length === list.length
                ? refs.current.filter((_, index) => index !== refs.current.length - 1)
                : [...refs.current];

            filteredRefs.forEach((item) => {
              if (Number(item.id) >= Number(notification.id)) {
                const { height } = item.getBoundingClientRect();
                notificationTop += height + 8;
              }
            });

            return (
              <Notification
                {...notification}
                ref={(item) => item && refs.current.push(item)}
                key={notification.id}
                top={notificationTop}
                onClose={(v, currentId) => {
                  if (notification.onClose) notification.onClose(v, currentId);
                  if (!v) {
                    setList((arr) => arr.filter(({ id: itemId }) => itemId !== currentId));
                    refs.current = refs.current.filter((item) => item.id !== currentId);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
