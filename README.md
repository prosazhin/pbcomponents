# pbcomponents

[Figma community](https://www.figma.com/community/file/1214486013859546496/pbcomponents) | [Behance](https://www.behance.net/gallery/206064847/pbcomponents)

## prosazhin basic components

UI component library for React and Vue with Typescript and Tailwind.

## Installation & Usage

### React

[Preview](https://pbcomponents-react.vercel.app/?path=/docs/intro--docs) | [GitHub](https://github.com/prosazhin/pbcomponents/tree/main/packages/%40pbcomponents-react) | [NPM](https://www.npmjs.com/package/@pbcomponents/react)

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

[Preview](https://pbcomponents-vue.vercel.app/?path=/docs/intro--docs) | [GitHub](https://github.com/prosazhin/pbcomponents/tree/main/packages/%40pbcomponents-vue) | [NPM](https://www.npmjs.com/package/@pbcomponents/vue)

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
