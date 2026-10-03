import { dialogsReducer, initialDialogsState, normalizeDialogPayload } from '@/components/shared/dialog-provider/store';
import { describe, expect, it } from 'vitest';

type State = typeof initialDialogsState;

const show = (state: State, id: string) => dialogsReducer(state, { type: 'SHOW', payload: { id, dialog: {} } });
const closed = (state: State, id: string) => dialogsReducer(state, { type: 'CLOSED', payload: { id } });

describe('dialogsReducer', () => {
  it('REGISTER добавляет закрытый диалог и не дублирует его в order', () => {
    const once = dialogsReducer(initialDialogsState, { type: 'REGISTER', payload: { id: 'a', dialog: {} } });
    const twice = dialogsReducer(once, { type: 'REGISTER', payload: { id: 'a', dialog: {} } });

    expect(twice.order).toEqual(['a']);
    expect(twice.byId.a.open).toBe(false);
    expect(twice.activeId).toBeNull();
  });

  it('SHOW без активного диалога открывает его и делает активным', () => {
    const state = show(initialDialogsState, 'a');

    expect(state.byId.a.open).toBe(true);
    expect(state.activeId).toBe('a');
  });

  it('SHOW поверх открытого закрывает текущий и ставит новый в очередь', () => {
    const state = show(show(initialDialogsState, 'a'), 'b');

    expect(state.byId.a.open).toBe(false);
    expect(state.byId.b.open).toBe(false);
    expect(state.activeId).toBe('a');
    expect(state.pendingId).toBe('b');
  });

  it('CLOSED активного открывает диалог из очереди', () => {
    const state = closed(show(show(initialDialogsState, 'a'), 'b'), 'a');

    expect(state.byId.b.open).toBe(true);
    expect(state.activeId).toBe('b');
    expect(state.pendingId).toBeNull();
  });

  it('CLOSED без очереди сбрасывает активный диалог', () => {
    const state = closed(show(initialDialogsState, 'a'), 'a');

    expect(state.activeId).toBeNull();
  });

  it('HIDE_ACTIVE закрывает активный диалог', () => {
    const state = dialogsReducer(show(initialDialogsState, 'a'), { type: 'HIDE_ACTIVE' });

    expect(state.byId.a.open).toBe(false);
  });

  it('HIDE диалога из очереди снимает его с очереди', () => {
    const state = dialogsReducer(show(show(initialDialogsState, 'a'), 'b'), { type: 'HIDE', payload: { id: 'b' } });

    expect(state.pendingId).toBeNull();
  });

  it('REMOVE активного диалога открывает следующий из очереди', () => {
    const state = dialogsReducer(show(show(initialDialogsState, 'a'), 'b'), { type: 'REMOVE', payload: { id: 'a' } });

    expect(state.byId.a).toBeUndefined();
    expect(state.order).toEqual(['b']);
    expect(state.activeId).toBe('b');
    expect(state.byId.b.open).toBe(true);
  });
});

describe('normalizeDialogPayload', () => {
  it('выкидывает id и управляющие поля', () => {
    expect(normalizeDialogPayload({ id: 'a', backdrop: true })).toEqual({ backdrop: true });
  });
});
