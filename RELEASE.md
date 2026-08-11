# Release Guide

Инструкция по релизу пакета `@prosazhin/pbcomponents`.

## Как это работает

Релиз полностью автоматический и делается **одним шагом** — обычным пушем в `main`.

Workflow: `.github/workflows/release.yml`

Триггеры:

- `push` в ветку `main`
- `workflow_dispatch` (ручной перезапуск из UI GitHub Actions)

Pipeline состоит из двух job:

1. **`gate` (Check version)** — читает версию из `workspaces/pbcomponents/package.json`
   и спрашивает npm, опубликована ли уже такая версия:
   - версия уже есть в npm → workflow тихо останавливается, ничего не публикуется;
   - версии нет → идём дальше.
2. **`release` (Build and publish)** — выполняется только если job `gate` разрешил:
   - `npm ci`
   - `npm run lint`
   - `npm run build:components`
   - `npm publish ./workspaces/pbcomponents --provenance --access public`
   - создаёт тег `@prosazhin/pbcomponents@v<version>` и GitHub Release
     (тег создаёт сам `softprops/action-gh-release`, отдельного шага нет)
   - дёргает React Vercel webhook

> Проверка идёт против npm, а не против предыдущего коммита. Поэтому pipeline
> идемпотентен: повторный push, squash-мердж или ре-ран workflow не приводят
> к повторной публикации и не падают с ошибкой.

## Процедура релиза

1. Поднять версию в `workspaces/pbcomponents/package.json`.
2. Влить изменения в `main`.
3. Готово — workflow `Release` сам соберёт, опубликует, поставит тег и создаст релиз.

Если версию не поднять — ничего не сломается, workflow просто пропустит релиз.

## Теги

Формат тега: `@prosazhin/pbcomponents@v<version>`, например `@prosazhin/pbcomponents@v1.0.3`.

Тег **создаётся автоматически** из версии в `package.json`. Руками теги ставить не нужно,
и push тега больше не запускает релиз.

## Pre-release checks (локально)

В корне репозитория:

```bash
npm run lint
npm run build
npm pack --dry-run --workspace=@prosazhin/pbcomponents --cache ./.npm-cache
```

## Обязательные секреты GitHub

- `NPM_TOKEN`
- `REACT_VERCEL_WEBHOOK_URL`

> Секрет `ACCESS_TOKEN` (PAT) больше не нужен: раньше он требовался, чтобы тег из одного
> workflow триггерил другой. Теперь всё происходит в одном workflow, и хватает штатного
> `GITHUB_TOKEN` с правами `contents: write`.
