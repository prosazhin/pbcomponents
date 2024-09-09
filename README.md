# pbcomponents

[Preview for React](https://pbcomponents-react.vercel.app/?path=/docs/intro--docs) | [Preview for Vue](https://pbcomponents-vue.vercel.app/?path=/docs/intro--docs) | [Figma community](https://www.figma.com/community/file/1214486013859546496/pbcomponents)

## prosazhin basic components

UI component library for React and Vue with Typescript and Tailwind.

## Installation & Usage

### React

[GitHub React](https://github.com/prosazhin/pbcomponents/tree/main/packages/react)

```bash
npm install @pbcomponents/react
```

```javascript
'use client';

import { Button } from '@pbcomponents/react';

const Page = () => (
  <>
    <Button size='m' color='primary' theme='filled' onClick={() => {}}>
      Button
    </Button>
  </>
);
```

### Vue

[GitHub Vue](https://github.com/prosazhin/pbcomponents/tree/main/packages/vue)

```bash
npm install @pbcomponents/vue
```

```javascript
<script setup>
import { Button } from '@pbcomponents/vue';
</script>

<template>
  <Button size='m' color='primary' theme='filled' @click={() => {}}>
    Button
  </Button>
</template>
```

## Components

| Name                   | Ready to use for React | React Preview                                                                              | Ready to use for Vue | Vue Preview |
| :--------------------- | :--------------------- | :----------------------------------------------------------------------------------------- | :------------------- | :---------- |
| Button                 | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-button-button--docs)   | -                    | -           |
| Button Link            | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-button-link--docs)     | -                    | -           |
| Button Group           | -                      | -                                                                                          | -                    | -           |
| Badge                  | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-badge--docs)           | -                    | -           |
| Tag Button             | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tag-button--docs)      | -                    | -           |
| Tag Link               | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tag-link--docs)        | -                    | -           |
| Checkbox               | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-checkbox--docs)        | -                    | -           |
| Switch                 | -                      | -                                                                                          | -                    | -           |
| Radio                  | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-radio--docs)           | -                    | -           |
| Inline Radio           | -                      | -                                                                                          | -                    | -           |
| Inline Radio Item      | -                      | -                                                                                          | -                    | -           |
| Input                  | -                      | -                                                                                          | -                    | -           |
| Textarea               | -                      | -                                                                                          | -                    | -           |
| Select                 | -                      | -                                                                                          | -                    | -           |
| Field                  | -                      | -                                                                                          | -                    | -           |
| Dropdown               | -                      | -                                                                                          | -                    | -           |
| Dropdown Item          | -                      | -                                                                                          | -                    | -           |
| Dropdown Item Checkbox | -                      | -                                                                                          | -                    | -           |
| Dropdown Item Switch   | -                      | -                                                                                          | -                    | -           |
| Dropdown Item Radio    | -                      | -                                                                                          | -                    | -           |
| Tabs                   | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tabs--docs)            | -                    | -           |
| Tab Button             | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tabs-tab-button--docs) | -                    | -           |
| Tab Link               | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tabs-tab-link--docs)   | -                    | -           |
| Collapse               | -                      | -                                                                                          | -                    | -           |
| Collapse Item          | -                      | -                                                                                          | -                    | -           |
| Alert                  | -                      | -                                                                                          | -                    | -           |
| Modal                  | -                      | -                                                                                          | -                    | -           |
| Notification           | -                      | -                                                                                          | -                    | -           |

## Helpers

| Name    | Ready to use for React | React Preview                                                                   | Ready to use for Vue | Vue Preview |
| :------ | :--------------------- | :------------------------------------------------------------------------------ | :------------------- | :---------- |
| Text    | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-text--docs)    | -                    | -           |
| Icon    | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-icon--docs)    | -                    | -           |
| Content | +                      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-content--docs) | -                    | -           |
