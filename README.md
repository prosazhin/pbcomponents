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

| Name                   | React Preview                                                                                                    | Vue Preview |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------- | :---------- |
| Button                 | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-buttons-button-button--docs)                 | -           |
| Button Link            | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-buttons-button-button-link--docs)            | -           |
| Button Group           | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-buttons-button-group--docs)                  | -           |
| Badge                  | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-badge--docs)                                 | -           |
| Tag Button             | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tag-tag-button--docs)                        | -           |
| Tag Link               | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tag-tag-link--docs)                          | -           |
| Checkbox               | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-checkbox--docs)                              | -           |
| Switch                 | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-switch--docs)                                | -           |
| Radio                  | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-radio-group-radio--docs)                     | -           |
| Radio Group            | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-radio-group-radio-group--docs)               | -           |
| Inline Radio           | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-inline-radio-group-inline-radio--docs)       | -           |
| Inline Radio Item      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-inline-radio-group-inline-radio-group--docs) | -           |
| Input                  | -                                                                                                                | -           |
| Textarea               | -                                                                                                                | -           |
| Select                 | -                                                                                                                | -           |
| Field                  | -                                                                                                                | -           |
| Dropdown               | -                                                                                                                | -           |
| Dropdown Item          | -                                                                                                                | -           |
| Dropdown Item Checkbox | -                                                                                                                | -           |
| Dropdown Item Switch   | -                                                                                                                | -           |
| Dropdown Item Radio    | -                                                                                                                | -           |
| Tabs                   | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tabs-tabs--docs)                             | -           |
| Tab Button             | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tabs-tab-tab-button--docs)                   | -           |
| Tab Link               | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tabs-tab-tab-link--docs)                     | -           |
| Collapse               | -                                                                                                                | -           |
| Collapse Item          | -                                                                                                                | -           |
| Alert                  | -                                                                                                                | -           |
| Modal                  | -                                                                                                                | -           |
| Notification           | -                                                                                                                | -           |

## Helpers

| Name    | React Preview                                                                   | Vue Preview |
| :------ | :------------------------------------------------------------------------------ | :---------- |
| Text    | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-text--docs)    | -           |
| Icon    | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-icon--docs)    | -           |
| Content | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-content--docs) | -           |
