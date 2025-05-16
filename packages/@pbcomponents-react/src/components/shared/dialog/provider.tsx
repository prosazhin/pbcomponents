'use client';

import Dialog, { DialogProps } from '@/components/shared/dialog';
import { createContext, useContext, useEffect, useState } from 'react';

export interface DialogContextProps {
  showDialog: (value: DialogProps) => void;
  closeDialog: (id: string) => void;
}

const DialogContext = createContext<DialogContextProps>(null!);

export interface DialogProviderProps {
  children: React.ReactNode;
}

export const DialogProvider = (props: DialogProviderProps) => {
  const { children } = props;
  const [currentDialog, setCurrentDialog] = useState<DialogProps | undefined>(null!);
  const [nextDialog, setNextDialog] = useState<DialogProps | undefined>(null!);
  const delay = 210;

  const showDialog = (value: DialogProps) => {
    if (!!currentDialog) {
      setCurrentDialog({ ...currentDialog, open: false });
    }
    setNextDialog({ ...value, open: true });
  };

  const closeDialog = (id: string) => {
    if (!!currentDialog) {
      if (currentDialog.id === id) {
        setCurrentDialog({ ...currentDialog, open: false });
      }
    }
  };

  useEffect(() => {
    if (nextDialog !== undefined && currentDialog !== undefined) {
      const timeout = setTimeout(() => {
        setCurrentDialog(nextDialog);
        setNextDialog(undefined);
      }, delay);

      return () => clearTimeout(timeout);
    }

    if (nextDialog !== undefined && currentDialog === undefined) {
      setCurrentDialog(nextDialog);
      setNextDialog(undefined);
    }

    if (nextDialog === undefined && currentDialog === undefined) {
      setCurrentDialog(null!);
      setNextDialog(null!);
    }
  }, [nextDialog, currentDialog]);

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}
      <div
        className='pbc:fixed pbc:z-800 pbc:inset-0 pbc:size-full pbc:m-auto pbc:p-0 pbc:pointer-events-none'
        aria-live='assertive'
        id='pbc-dialogs-provider'
      >
        {currentDialog && (
          <Dialog
            {...currentDialog}
            onClose={(v, currentId) => {
              if (currentDialog.onClose) currentDialog.onClose(v, currentId);
              if (!v) setCurrentDialog(undefined);
            }}
            className='pbc:absolute'
          />
        )}
      </div>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
