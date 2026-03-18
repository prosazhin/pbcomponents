import type { DialogInput, DialogPayload, DialogRecord } from '@/components/shared/dialog-provider/types';

interface DialogsState {
  byId: Record<string, DialogRecord>;
  order: string[];
  activeId: string | null;
  pendingId: string | null;
}

type DialogsAction =
  | { type: 'REGISTER'; payload: { id: string; dialog: DialogPayload } }
  | { type: 'SHOW'; payload: { id: string; dialog: DialogPayload } }
  | { type: 'HIDE'; payload: { id: string } }
  | { type: 'HIDE_ACTIVE' }
  | { type: 'CLOSED'; payload: { id: string } }
  | { type: 'REMOVE'; payload: { id: string } };

const closeAllDialogs = (dialogs: Record<string, DialogRecord>): Record<string, DialogRecord> => {
  let hasChanges = false;
  const nextDialogs: Record<string, DialogRecord> = {};

  Object.entries(dialogs).forEach(([id, dialog]) => {
    if (!dialog.open) {
      nextDialogs[id] = dialog;

      return;
    }

    hasChanges = true;
    nextDialogs[id] = {
      ...dialog,
      open: false,
      updatedAt: Date.now(),
    };
  });

  return hasChanges ? nextDialogs : dialogs;
};

export const initialDialogsState: DialogsState = {
  byId: {},
  order: [],
  activeId: null,
  pendingId: null,
};

export const normalizeDialogPayload = (input: DialogInput): DialogPayload => {
  const payload = { ...input } as Record<string, unknown>;

  delete payload.id;
  delete payload.open;
  delete payload.defaultOpen;
  delete payload.ref;

  return payload as DialogPayload;
};

export const dialogsReducer = (state: DialogsState, action: DialogsAction): DialogsState => {
  switch (action.type) {
    case 'REGISTER': {
      const {
        payload: { id, dialog },
      } = action;
      const now = Date.now();
      const currentDialog = state.byId[id];

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            id,
            payload: dialog,
            open: currentDialog?.open ?? false,
            createdAt: currentDialog?.createdAt ?? now,
            updatedAt: now,
          },
        },
        order: currentDialog ? state.order : [...state.order, id],
      };
    }
    case 'SHOW': {
      const {
        payload: { id, dialog },
      } = action;
      const now = Date.now();
      const currentDialog = state.byId[id];

      const upsertedById = {
        ...state.byId,
        [id]: {
          id,
          payload: dialog,
          open: currentDialog?.open ?? false,
          createdAt: currentDialog?.createdAt ?? now,
          updatedAt: now,
        },
      };
      const nextOrder = currentDialog ? state.order : [...state.order, id];

      if (state.activeId === id) {
        return {
          ...state,
          byId: {
            ...upsertedById,
            [id]: {
              ...upsertedById[id],
              open: true,
              updatedAt: now,
            },
          },
          order: nextOrder,
          pendingId: null,
        };
      }

      if (state.activeId) {
        const activeDialog = upsertedById[state.activeId];

        return {
          ...state,
          byId: {
            ...upsertedById,
            ...(activeDialog
              ? {
                  [state.activeId]: {
                    ...activeDialog,
                    open: false,
                    updatedAt: now,
                  },
                }
              : {}),
            [id]: {
              ...upsertedById[id],
              open: false,
              updatedAt: now,
            },
          },
          order: nextOrder,
          pendingId: id,
        };
      }

      const closedDialogs = closeAllDialogs(upsertedById);

      return {
        ...state,
        byId: {
          ...closedDialogs,
          [id]: {
            ...closedDialogs[id],
            open: true,
            updatedAt: now,
          },
        },
        order: nextOrder,
        activeId: id,
        pendingId: null,
      };
    }
    case 'HIDE': {
      const { id } = action.payload;
      const currentDialog = state.byId[id];
      if (!currentDialog || !currentDialog.open) {
        return state.pendingId === id
          ? {
              ...state,
              pendingId: null,
            }
          : state;
      }

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...currentDialog,
            open: false,
            updatedAt: Date.now(),
          },
        },
        pendingId: state.pendingId === id ? null : state.pendingId,
      };
    }
    case 'HIDE_ACTIVE': {
      if (!state.activeId) return state;

      const currentDialog = state.byId[state.activeId];
      if (!currentDialog || !currentDialog.open) return state;

      return {
        ...state,
        byId: {
          ...state.byId,
          [state.activeId]: {
            ...currentDialog,
            open: false,
            updatedAt: Date.now(),
          },
        },
      };
    }
    case 'CLOSED': {
      const { id } = action.payload;
      const pendingId = state.pendingId;

      if (pendingId && pendingId !== id && state.byId[pendingId]) {
        const now = Date.now();
        const closedDialogs = closeAllDialogs(state.byId);

        return {
          ...state,
          byId: {
            ...closedDialogs,
            [pendingId]: {
              ...closedDialogs[pendingId],
              open: true,
              updatedAt: now,
            },
          },
          activeId: pendingId,
          pendingId: null,
        };
      }

      if (state.activeId === id) {
        return {
          ...state,
          activeId: null,
          pendingId: null,
        };
      }

      return state;
    }
    case 'REMOVE': {
      const { id } = action.payload;
      const currentDialog = state.byId[id];
      if (!currentDialog) return state;

      const nextById = { ...state.byId };
      delete nextById[id];
      const nextOrder = state.order.filter((dialogId) => dialogId !== id);

      const pendingId = state.pendingId === id ? null : state.pendingId;

      if (state.activeId === id) {
        if (pendingId && nextById[pendingId]) {
          const now = Date.now();

          return {
            byId: {
              ...closeAllDialogs(nextById),
              [pendingId]: {
                ...nextById[pendingId],
                open: true,
                updatedAt: now,
              },
            },
            order: nextOrder,
            activeId: pendingId,
            pendingId: null,
          };
        }

        return {
          byId: nextById,
          order: nextOrder,
          activeId: null,
          pendingId: null,
        };
      }

      return {
        ...state,
        byId: nextById,
        order: nextOrder,
        pendingId,
      };
    }
    default:
      return state;
  }
};
