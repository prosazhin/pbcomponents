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

| Name                   | React Preview                                                                                              | Vue Preview |
| :--------------------- | :--------------------------------------------------------------------------------------------------------- | :---------- |
| Button                 | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-button-button--docs)                   | -           |
| Button Group           | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-button-button-group--docs)             | -           |
| Badge                  | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-badge--docs)                           | -           |
| Tag                    | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tag--docs)                             | -           |
| Checkbox               | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-checkbox-checkbox--docs)               | -           |
| Checkbox Group         | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-checkbox-checkbox-group--docs)         | -           |
| Switch                 | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-checkbox-switch--docs)                 | -           |
| Radio                  | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-radio-radio--docs)                     | -           |
| Radio Group            | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-radio-radio-group--docs)               | -           |
| Inline Radio           | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-inline-radio-inline-radio--docs)       | -           |
| Inline Radio Item      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-inline-radio-inline-radio-group--docs) | -           |
| Input                  | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-input--docs)                     | -           |
| Textarea               | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-textarea--docs)                  | -           |
| Select                 | -                                                                                                          | -           |
| Field                  | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-field--docs)                     | -           |
| Dropdown               | -                                                                                                          | -           |
| Dropdown Item          | -                                                                                                          | -           |
| Dropdown Item Checkbox | -                                                                                                          | -           |
| Dropdown Item Switch   | -                                                                                                          | -           |
| Dropdown Item Radio    | -                                                                                                          | -           |
| Tabs                   | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tabs-tabs--docs)                       | -           |
| Tab                    | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tabs-tab--docs)                        | -           |
| Collapse               | -                                                                                                          | -           |
| Collapse Item          | -                                                                                                          | -           |
| Alert                  | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-alert--docs)                           | -           |
| Modal                  | -                                                                                                          | -           |
| Notification           | -                                                                                                          | -           |
| Headline               | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-headline--docs)                        | -           |
| Container              | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-container--docs)                       | -           |

## Helpers

| Name    | React Preview                                                                   | Vue Preview |
| :------ | :------------------------------------------------------------------------------ | :---------- |
| Text    | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-text--docs)    | -           |
| Icon    | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-icon--docs)    | -           |
| Content | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-content--docs) | -           |
