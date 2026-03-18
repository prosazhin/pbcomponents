import { PBCProvider } from '@prosazhin/pbcomponents';
import type { Preview } from '@storybook/react-vite';
import React from 'react';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      codePanel: true,
    },
    actions: {
      disable: true,
    },
    interactions: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <PBCProvider>
        <Story />
      </PBCProvider>
    ),
  ],
};

export default preview;
