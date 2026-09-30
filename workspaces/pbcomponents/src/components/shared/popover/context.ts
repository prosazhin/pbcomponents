import { createContext } from 'react';

// даёт пунктам Popover.Item закрыть попап после клика
export const PopoverContext = createContext<{ close: () => void } | null>(null);
