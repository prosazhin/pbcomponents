# Release Guide

Инструкция по релизу пакета `@prosazhin/pbcomponents`.

## Формат релизного тега

Используем только новый формат:

`@prosazhin/pbcomponents@v<version>`

Пример:

`@prosazhin/pbcomponents@v0.1.6`

> Важно: теги в другом формате не запускают workflow релиза.

## Что запускает релиз

Workflow: `.github/workflows/release.yml`

Триггер:

- `push` тега `@prosazhin/pbcomponents@v*`

Что делает pipeline:

1. Устанавливает зависимости (`npm ci --legacy-peer-deps`).
2. Собирает библиотеку (`npm run build:components`).
3. Публикует `./workspaces/pbcomponents` в npm.
4. Создаёт GitHub Release.
5. Вызывает React Vercel webhook.

## Pre-release checks (локально)

В корне репозитория:

```bash
npm run lint
npm run build
npm pack --dry-run --workspace=@prosazhin/pbcomponents --cache ./.npm-cache
```

## Процедура релиза

1. Убедиться, что версия в `workspaces/pbcomponents/package.json` обновлена.
2. Закоммитить изменения в `main`.
3. Создать и отправить релизный тег:

```bash
git tag @prosazhin/pbcomponents@v0.1.6
git push origin @prosazhin/pbcomponents@v0.1.6
```

4. Проверить выполнение workflow `Release` в GitHub Actions.
5. Проверить публикацию версии в npm.

## Обязательные секреты GitHub

Для успешного релиза в репозитории должны быть настроены:

- `NPM_TOKEN`
- `ACCESS_TOKEN`
- `REACT_VERCEL_WEBHOOK_URL`
