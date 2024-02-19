import type { Preview } from "@storybook/react";
import '../src/commonStyles/base.scss';
import './preview.styles.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FFEBEB',
        },
      ],
    },
  },
};

export default preview;
