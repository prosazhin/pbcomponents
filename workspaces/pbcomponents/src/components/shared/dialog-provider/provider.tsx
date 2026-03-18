'use client';

import Dialog, { type DialogProps } from '@/components/shared/dialog';
import { dialogsReducer, initialDialogsState, normalizeDialogPayload } from '@/components/shared/dialog-provider/store';
import type { DialogContextProps, DialogInput, DialogProviderProps, DialogRecord } from '@/components/shared/dialog-provider/types';
import clsx from 'clsx';
import { createContext, type ReactElement, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';

const DialogContext = createContext<DialogContextProps | null>(null);
const DEFAULT_USE_SHOW_DIALOG_DEPENDENCIES: readonly unknown[] = [];

const useDialogContext = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog must be used within DialogProvider');
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDialog = () => {
  const { dialogs, activeDialog, closeDialog } = useDialogContext();

  return {
    dialogs,
    activeDialog,
    closeDialog,
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export const useShowDialog = (
  dialog: () => ReactElement<DialogProps>,
  dependencies: readonly unknown[] = DEFAULT_USE_SHOW_DIALOG_DEPENDENCIES,
) => {
  const { registerDialog, unregisterDialog, showDialog } = useDialogContext();
  const dialogRef = useRef(dialog);
  const registeredDialogIdRef = useRef<string | null>(null);

  dialogRef.current = dialog;

  useEffect(() => {
    const currentDialog = dialogRef.current();
    const nextId = currentDialog.props.id;
    const registeredId = registeredDialogIdRef.current;

    if (!registeredId) {
      registerDialog(currentDialog.props);
      registeredDialogIdRef.current = nextId;

      return;
    }

    if (registeredId !== nextId) {
      unregisterDialog(registeredId);
      registerDialog(currentDialog.props);
      registeredDialogIdRef.current = nextId;

      return;
    }

    registerDialog(currentDialog.props);
  }, [registerDialog, unregisterDialog, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      const registeredId = registeredDialogIdRef.current;
      if (!registeredId) return;

      unregisterDialog(registeredId);
      registeredDialogIdRef.current = null;
    };
  }, [unregisterDialog]);

  return useCallback(() => {
    const currentDialog = dialogRef.current();

    return showDialog(currentDialog.props);
  }, [showDialog]);
};

export const DialogProvider = (props: DialogProviderProps) => {
  const { children, className, animationDuration } = props;
  const [state, dispatch] = useReducer(dialogsReducer, initialDialogsState);

  const dialogs = useMemo(
    () => state.order.map((id) => state.byId[id]).filter((dialog): dialog is DialogRecord => dialog !== undefined),
    [state.byId, state.order],
  );
  const activeDialog = useMemo(() => {
    if (!state.activeId) return null;

    return state.byId[state.activeId] ?? null;
  }, [state.activeId, state.byId]);

  const registerDialog = useCallback((dialogInput: DialogInput) => {
    const id = dialogInput.id;

    dispatch({
      type: 'REGISTER',
      payload: {
        id,
        dialog: normalizeDialogPayload(dialogInput),
      },
    });

    return id;
  }, []);

  const unregisterDialog = useCallback((id: string) => {
    dispatch({
      type: 'REMOVE',
      payload: { id },
    });
  }, []);

  const showDialog = useCallback((dialogInput: DialogInput) => {
    const id = dialogInput.id;

    dispatch({
      type: 'SHOW',
      payload: {
        id,
        dialog: normalizeDialogPayload(dialogInput),
      },
    });

    return id;
  }, []);

  const closeDialog = useCallback((id?: string) => {
    if (id) {
      dispatch({
        type: 'HIDE',
        payload: { id },
      });

      return;
    }

    dispatch({ type: 'HIDE_ACTIVE' });
  }, []);

  const invokeDialogCallback = useCallback((callback: ((value: boolean, id?: string) => void) | undefined, value: boolean, id: string) => {
    if (!callback) return;

    try {
      callback(value, id);
    } catch {
      // ignore dialog callback failures
    }
  }, []);

  const contextValue = useMemo<DialogContextProps>(
    () => ({
      dialogs,
      activeDialog,
      closeDialog,
      showDialog,
      registerDialog,
      unregisterDialog,
    }),
    [activeDialog, closeDialog, dialogs, registerDialog, showDialog, unregisterDialog],
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <div
        className={clsx('pbc:fixed pbc:z-800 pbc:inset-0 pbc:size-full pbc:m-auto pbc:p-0 pbc:pointer-events-none', className)}
        aria-live='assertive'
        id='pbc-dialogs-provider'
      >
        {dialogs.map((dialog) => {
          const resolvedDialogProps: DialogProps = {
            ...dialog.payload,
            id: dialog.id,
            open: dialog.open,
            animationDuration: dialog.payload.animationDuration ?? animationDuration,
          };

          return (
            <Dialog
              key={dialog.id}
              {...resolvedDialogProps}
              onOpenChange={(value, id) => {
                const resolvedId = id ?? dialog.id;
                invokeDialogCallback(dialog.payload.onOpenChange, value, resolvedId);

                if (!value) {
                  closeDialog(resolvedId);
                }
              }}
              onClose={(value, id) => {
                const resolvedId = id ?? dialog.id;
                invokeDialogCallback(dialog.payload.onClose, value, resolvedId);

                if (!value) {
                  dispatch({
                    type: 'CLOSED',
                    payload: { id: resolvedId },
                  });
                }
              }}
            />
          );
        })}
      </div>
    </DialogContext.Provider>
  );
};

DialogProvider.displayName = 'DialogProvider';
export default DialogProvider;
