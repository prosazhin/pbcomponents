/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
