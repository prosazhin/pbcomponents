import type { StorybookConfig } from '@storybook/react-vite';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-docs')],
  features: {
    onboarding: false,
    sidebarOnboardingChecklist: false,
  },
  docs: {
    defaultName: 'Documentation',
  },
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  // Крупные чанки (iframe.js, blocks.js) приходят из самого Storybook и не режутся
  // код-сплитом на нашей стороне, поэтому просто поднимаем порог предупреждения.
  viteFinal: async (config) => ({
    ...config,
    build: { ...config.build, chunkSizeWarningLimit: 2000 },
  }),
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
