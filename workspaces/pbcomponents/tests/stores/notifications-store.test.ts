import {
  initialNotificationsState,
  normalizeNotificationPayload,
  notificationsReducer,
} from '@/components/shared/notifications-provider/store';
import { describe, expect, it } from 'vitest';

const add = (state: typeof initialNotificationsState, id: string, headline = id) =>
  notificationsReducer(state, { type: 'ADD', payload: { id, notification: { headline } } });

describe('notificationsReducer', () => {
  it('ADD кладёт новое уведомление первым и открытым', () => {
    const state = add(add(initialNotificationsState, 'a'), 'b');

    expect(state.order).toEqual(['b', 'a']);
    expect(state.byId.b.open).toBe(true);
  });

  it('повторный ADD с тем же id обновляет уведомление и поднимает его наверх', () => {
    const first = add(add(initialNotificationsState, 'a', 'old'), 'b');
    const state = add(first, 'a', 'new');

    expect(state.order).toEqual(['a', 'b']);
    expect(state.byId.a.payload.headline).toBe('new');
    expect(state.byId.a.createdAt).toBe(first.byId.a.createdAt);
  });

  it('CLOSE закрывает, но не удаляет; повторный CLOSE ничего не меняет', () => {
    const closed = notificationsReducer(add(initialNotificationsState, 'a'), { type: 'CLOSE', payload: { id: 'a' } });

    expect(closed.byId.a.open).toBe(false);
    expect(closed.order).toEqual(['a']);
    expect(notificationsReducer(closed, { type: 'CLOSE', payload: { id: 'a' } })).toBe(closed);
  });

  it('REMOVE удаляет уведомление; неизвестный id не трогает состояние', () => {
    const state = add(add(initialNotificationsState, 'a'), 'b');
    const removed = notificationsReducer(state, { type: 'REMOVE', payload: { id: 'a' } });

    expect(removed.order).toEqual(['b']);
    expect(removed.byId.a).toBeUndefined();
    expect(notificationsReducer(removed, { type: 'REMOVE', payload: { id: 'missing' } })).toBe(removed);
  });
});

describe('normalizeNotificationPayload', () => {
  it('выкидывает служебные поля', () => {
    const payload = normalizeNotificationPayload({ id: 'x', headline: 'Hi', children: 'text' });

    expect(payload).toEqual({ headline: 'Hi', children: 'text' });
  });
});
