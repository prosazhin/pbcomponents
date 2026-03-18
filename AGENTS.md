# AGENTS.md

## Язык ответов

- Всегда отвечать **только на русском языке**.
- Не переключаться на английский, если это отдельно не потребовал пользователь в явном виде.

## Назначение репозитория

`pbcomponents` — монорепозиторий UI-библиотеки компонентов `pbcomponents` и playground на Storybook.

## Workspace-структура проекта

### Корень репозитория

- `package.json` — root workspace-конфиг (`workspaces/*`), общие скрипты (`dev`, `build`, `lint`, `format`).
- `package-lock.json` — lockfile npm.
- `README.md` — краткая документация проекта.
- `LICENSE` — лицензия.
- `vercel.json` — конфиг деплоя.
- `.github/` — CI/workflows.
- `.vscode/` — локальные настройки IDE.

### Пакеты

- `workspaces/pbcomponents` — исходники библиотеки компонентов React.

### Playground

- `workspaces/storybook` — Storybook playground для демонстрации компонентов.

---

## Подробно: `workspaces/pbcomponents`

### Основные директории

- `workspaces/pbcomponents/src/assets/`
  - `index.css`
  - `x-mark-16.svg`
  - `x-mark-20.svg`
- `workspaces/pbcomponents/src/components/`
  - `index.ts` (экспорты компонентов)
  - `helpers/`
  - `shared/`
- `workspaces/pbcomponents/src/hooks/`
- `workspaces/pbcomponents/src/index.ts` (публичная точка входа)
- `workspaces/pbcomponents/src/types.ts`
- `workspaces/pbcomponents/src/vite-env.d.ts`

### Components: helpers

- `workspaces/pbcomponents/src/components/helpers/content.tsx`
- `workspaces/pbcomponents/src/components/helpers/icon.tsx`
- `workspaces/pbcomponents/src/components/helpers/text.tsx`

### Components: shared

- `workspaces/pbcomponents/src/components/shared/alert.tsx`
- `workspaces/pbcomponents/src/components/shared/badge.tsx`
- `workspaces/pbcomponents/src/components/shared/button/index.tsx`
- `workspaces/pbcomponents/src/components/shared/button/group.tsx`
- `workspaces/pbcomponents/src/components/shared/checkbox/index.tsx`
- `workspaces/pbcomponents/src/components/shared/checkbox/group.tsx`
- `workspaces/pbcomponents/src/components/shared/checkbox/switch.tsx`
- `workspaces/pbcomponents/src/components/shared/collapse/index.tsx`
- `workspaces/pbcomponents/src/components/shared/collapse/group.tsx`
- `workspaces/pbcomponents/src/components/shared/container.tsx`
- `workspaces/pbcomponents/src/components/shared/dialog/index.tsx`
- `workspaces/pbcomponents/src/components/shared/dialog/provider.tsx`
- `workspaces/pbcomponents/src/components/shared/dropdown/index.tsx`
- `workspaces/pbcomponents/src/components/shared/dropdown/item.tsx`
- `workspaces/pbcomponents/src/components/shared/field/index.tsx`
- `workspaces/pbcomponents/src/components/shared/field/input.tsx`
- `workspaces/pbcomponents/src/components/shared/field/search.tsx`
- `workspaces/pbcomponents/src/components/shared/field/select.tsx`
- `workspaces/pbcomponents/src/components/shared/field/textarea.tsx`
- `workspaces/pbcomponents/src/components/shared/headline.tsx`
- `workspaces/pbcomponents/src/components/shared/inline-radio/index.tsx`
- `workspaces/pbcomponents/src/components/shared/inline-radio/group.tsx`
- `workspaces/pbcomponents/src/components/shared/notification/index.tsx`
- `workspaces/pbcomponents/src/components/shared/notification/provider.tsx`
- `workspaces/pbcomponents/src/components/shared/provider.tsx` (агрегирующий провайдер)
- `workspaces/pbcomponents/src/components/shared/radio/index.tsx`
- `workspaces/pbcomponents/src/components/shared/radio/group.tsx`
- `workspaces/pbcomponents/src/components/shared/tabs/index.tsx`
- `workspaces/pbcomponents/src/components/shared/tabs/item.tsx`
- `workspaces/pbcomponents/src/components/shared/tag.tsx`

### Hooks

- `workspaces/pbcomponents/src/hooks/use-click-outside.ts`
- `workspaces/pbcomponents/src/hooks/use-controllable-state.ts`
- `workspaces/pbcomponents/src/hooks/use-countdown.ts`
- `workspaces/pbcomponents/src/hooks/use-hover-controllable.ts`
- `workspaces/pbcomponents/src/hooks/use-keydown.ts`
- `workspaces/pbcomponents/src/hooks/use-merge-refs.ts`
- `workspaces/pbcomponents/src/hooks/use-screen-size.ts`

---

## Подробно: `workspaces/storybook` (Storybook)

### Storybook-конфиг

- `workspaces/storybook/.storybook/main.ts`
- `workspaces/storybook/.storybook/preview.tsx`
- `workspaces/storybook/.storybook/manager.js`
- `workspaces/storybook/.storybook/theme.js`
- `workspaces/storybook/.storybook/manager-head.html`

### Stories

- `workspaces/storybook/stories/Intro.mdx`

#### Components stories

- `workspaces/storybook/stories/components/Alert.stories.tsx`
- `workspaces/storybook/stories/components/Badge.stories.tsx`
- `workspaces/storybook/stories/components/Container.stories.tsx`
- `workspaces/storybook/stories/components/Dialog.stories.tsx`
- `workspaces/storybook/stories/components/Headline.stories.tsx`
- `workspaces/storybook/stories/components/Notification.stories.tsx`
- `workspaces/storybook/stories/components/Tag.stories.tsx`
- `workspaces/storybook/stories/components/button/Button.stories.tsx`
- `workspaces/storybook/stories/components/button/Group.stories.tsx`
- `workspaces/storybook/stories/components/checkbox/Checkbox.stories.tsx`
- `workspaces/storybook/stories/components/checkbox/Group.stories.tsx`
- `workspaces/storybook/stories/components/checkbox/Switch.stories.tsx`
- `workspaces/storybook/stories/components/collapse/Collapse.stories.tsx`
- `workspaces/storybook/stories/components/collapse/Group.stories.tsx`
- `workspaces/storybook/stories/components/dropdown/Dropdown.stories.tsx`
- `workspaces/storybook/stories/components/dropdown/DropdownItem.stories.tsx`
- `workspaces/storybook/stories/components/field/Field.stories.tsx`
- `workspaces/storybook/stories/components/field/Input.stories.tsx`
- `workspaces/storybook/stories/components/field/Search.stories.tsx`
- `workspaces/storybook/stories/components/field/Select.stories.tsx`
- `workspaces/storybook/stories/components/field/Textarea.stories.tsx`
- `workspaces/storybook/stories/components/inline-radio/Group.stories.tsx`
- `workspaces/storybook/stories/components/inline-radio/InlineRadio.stories.tsx`
- `workspaces/storybook/stories/components/radio/Group.stories.tsx`
- `workspaces/storybook/stories/components/radio/Radio.stories.tsx`
- `workspaces/storybook/stories/components/tabs/Tab.stories.tsx`
- `workspaces/storybook/stories/components/tabs/Tabs.stories.tsx`

#### Helpers stories

- `workspaces/storybook/stories/helpers/Content.stories.tsx`
- `workspaces/storybook/stories/helpers/Icon.stories.tsx`
- `workspaces/storybook/stories/helpers/Text.stories.tsx`

#### Providers stories

- `workspaces/storybook/stories/providers/DialogProvider.stories.tsx`
- `workspaces/storybook/stories/providers/NotificationsProvider.stories.tsx`
- `workspaces/storybook/stories/providers/PBCProvider.stories.tsx`

---

## Быстрые команды

### В корне

- `npm run dev` — параллельно библиотека + Storybook.
- `npm run dev:components` — watch-сборка библиотеки.
- `npm run dev:storybook` — запуск Storybook.
- `npm run build` — сборка всего workspace.
- `npm run lint` — линт по всем workspace.

### Библиотека

- `npm run --workspace=pbcomponents dev`
- `npm run --workspace=pbcomponents build`
- `npm run --workspace=pbcomponents lint`

### Storybook playground

- `npm run --workspace=pbcomponents-storybook dev`
- `npm run --workspace=pbcomponents-storybook build`
- `npm run --workspace=pbcomponents-storybook lint`

---

## Автотесты

- В этом репозитории автотесты не ведутся: нет unit/integration/e2e-практики как обязательной части разработки.
- Не предлагать писать автотесты и не добавлять тестовую инфраструктуру в `workspaces/pbcomponents`.
- Для `workspaces/storybook` действует то же правило: не писать и не предлагать автотесты для сторис, конфигов и playground-сценариев.

---

## Правила для агентных правок

- Не ломать публичные экспорты из `workspaces/pbcomponents/src/index.ts`.
- Для новых компонентов добавлять:
  1. файл компонента в `src/components/...`,
  2. экспорт в `src/components/index.ts`,
  3. реэкспорт в `src/index.ts`,
  4. историю в `workspaces/storybook/stories/...`.
- Для провайдеров и сценариев с порталом использовать отдельные demo-истории.
- Поддерживать единый стиль stories: типизация через `Meta`/`StoryObj`, рабочие `args`, валидные `argTypes`.
