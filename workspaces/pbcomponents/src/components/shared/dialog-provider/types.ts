import type { DialogProps } from '@/components/shared/dialog';
import type { ReactNode } from 'react';

export type DialogInput = Omit<DialogProps, 'open' | 'defaultOpen' | 'ref'>;
export type DialogPayload = Omit<DialogInput, 'id'>;

export interface DialogRecord {
  id: string;
  payload: DialogPayload;
  open: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface DialogContextProps {
  dialogs: DialogRecord[];
  activeDialog: DialogRecord | null;
  closeDialog: (id?: string) => void;
  showDialog: (value: DialogInput) => string;
  registerDialog: (value: DialogInput) => string;
  unregisterDialog: (id: string) => void;
}

export interface DialogProviderProps {
  children: ReactNode;
  className?: string;
  animationDuration?: number;
}
