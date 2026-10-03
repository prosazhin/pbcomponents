import * as pbc from '@/index';
import { describe, expect, it } from 'vitest';

// публичный api пакета: всё, что потребитель импортирует из '@prosazhin/pbcomponents'
const COMPONENTS = [
  'Alert',
  'Badge',
  'Button',
  'ButtonGroup',
  'Checkbox',
  'CheckboxGroup',
  'Collapse',
  'CollapseGroup',
  'ConfirmDialog',
  'ConfirmPopover',
  'Container',
  'Content',
  'Dialog',
  'DialogProvider',
  'Field',
  'Headline',
  'Icon',
  'InlineRadio',
  'InlineRadioGroup',
  'Input',
  'Notification',
  'NotificationsProvider',
  'Pagination',
  'PBCProvider',
  'Popover',
  'PopoverItem',
  'Progress',
  'Radio',
  'RadioGroup',
  'Search',
  'Select',
  'Tab',
  'Tabs',
  'Tag',
  'Text',
  'Textarea',
  'Toggle',
  'Tooltip',
] as const;

const HOOKS = [
  'useClickOutside',
  'useControllableState',
  'useCountdown',
  'useDialog',
  'useHoverControllable',
  'useKeydown',
  'useMergeRefs',
  'useNotifications',
  'usePopover',
  'useScreenSize',
  'useShowDialog',
] as const;

describe('публичные экспорты', () => {
  it.each(COMPONENTS)('экспортирует компонент %s', (name) => {
    expect(typeof pbc[name]).toBe('function');
  });

  it.each(HOOKS)('экспортирует хук %s', (name) => {
    expect(typeof pbc[name]).toBe('function');
  });

  it('не экспортирует ничего лишнего', () => {
    expect(Object.keys(pbc).sort()).toEqual([...COMPONENTS, ...HOOKS].sort());
  });

  it('составные компоненты содержат подкомпоненты', () => {
    expect(pbc.Input.Control).toBeTypeOf('function');
    expect(pbc.Input.LeftAddon).toBeTypeOf('function');
    expect(pbc.Input.RightAddon).toBeTypeOf('function');
    expect(pbc.Popover.Item).toBe(pbc.PopoverItem);
  });
});
