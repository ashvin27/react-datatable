/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
    "@storybook/addon-styling-webpack",
    ({
      name: "@storybook/addon-styling-webpack",

      options: {
        rules: [{
          test: /\.(css|scss)$/,
          sideEffects: true,
          use: [
              require.resolve("style-loader"),
              {
                  loader: require.resolve("css-loader"),
                  options: {},
              },
              "sass-loader",
          ],
        },],
      }
    })
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
