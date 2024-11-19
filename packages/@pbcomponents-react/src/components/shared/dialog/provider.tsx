'use client';

import Dialog, { DialogProps } from '@/components/shared/dialog';
import { createContext, useContext, useEffect, useState } from 'react';

export interface DialogContextProps {
  showDialog: (value: DialogProps) => void;
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
    if (currentDialog !== undefined) setCurrentDialog({ ...currentDialog, open: false });
    setNextDialog({ ...value, open: true });
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
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      {currentDialog && (
        <Dialog
          {...currentDialog}
          onClose={(v, currentId) => {
            if (currentDialog.onClose) currentDialog.onClose(v, currentId);
            if (!v) setCurrentDialog(undefined);
          }}
        />
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
