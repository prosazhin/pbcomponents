# pbcomponents

[Preview for React](https://pbcomponents-react.vercel.app/?path=/docs/intro--docs) | [Preview for Vue](https://pbcomponents-vue.vercel.app/?path=/docs/intro--docs) | [Figma community](https://www.figma.com/community/file/1214486013859546496/pbcomponents)

## prosazhin basic components

UI component library for React and Vue with Typescript and Tailwind.

## Installation & Usage

### React

[GitHub React](https://github.com/prosazhin/pbcomponents/tree/main/packages/%40pbcomponents-react)

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

[GitHub Vue](https://github.com/prosazhin/pbcomponents/tree/main/packages/%40pbcomponents-vue)

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

| Name             | React Preview                                                                                            | Vue Preview |
| :--------------- | :------------------------------------------------------------------------------------------------------- | :---------- |
| Button           | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-button-button--docs)                 | -           |
| ButtonGroup      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-button-buttongroup--docs)            | -           |
| Badge            | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-badge--docs)                         | -           |
| Tag              | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tag--docs)                           | -           |
| Checkbox         | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-checkbox-checkbox--docs)             | -           |
| CheckboxGroup    | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-checkbox-checkboxgroup--docs)        | -           |
| Switch           | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-checkbox-switch--docs)               | -           |
| Radio            | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-radio-radio--docs)                   | -           |
| RadioGroup       | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-radio-radiogroup--docs)              | -           |
| InlineRadio      | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-inline-radio-inlineradio--docs)      | -           |
| InlineRadioGroup | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-inline-radio-inlineradiogroup--docs) | -           |
| Input            | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-input--docs)                   | -           |
| Textarea         | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-textarea--docs)                | -           |
| Select           | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-select--docs)                  | -           |
| Search           | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-search--docs)                  | -           |
| Field            | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-field-field--docs)                   | -           |
| Dropdown         | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-dropdown-dropdown--docs)             | -           |
| DropdownItem     | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-dropdown-dropdownitem--docs)         | -           |
| Tabs             | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tabs-tabs--docs)                     | -           |
| Tab              | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-tabs-tab--docs)                      | -           |
| Collapse         | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-collapse-collapse--docs)             | -           |
| CollapseGroup    | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-collapse-collapsegroup--docs)        | -           |
| Alert            | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-alert--docs)                         | -           |
| Modal            | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-modal--docs)                         | -           |
| Notification     | -                                                                                                        | -           |
| Headline         | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-headline--docs)                      | -           |
| Container        | [Link](https://pbcomponents-react.vercel.app/?path=/docs/components-container--docs)                     | -           |

## Helpers

| Name    | React Preview                                                                   | Vue Preview |
| :------ | :------------------------------------------------------------------------------ | :---------- |
| Text    | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-text--docs)    | -           |
| Icon    | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-icon--docs)    | -           |
| Content | [Link](https://pbcomponents-react.vercel.app/?path=/docs/helpers-content--docs) | -           |
