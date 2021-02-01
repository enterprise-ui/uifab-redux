module.exports = async ({ config }) => {
  const fileLoaderRule = config.module.rules.find((rule) => rule.test.test('.svg'))
  fileLoaderRule.exclude = /\.svg$/
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader'],
  })
  return config
}

module.exports = {
  stories: ['../src/**/*.stories.(tsx|mdx)'],
  addons: ['storybook-addon-styled-component-theme/dist/register'],
  webpackFinal: async (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test.test('.svg'))
    fileLoaderRule.exclude = /\.svg$/
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: { configFile: 'tsconfig.storybook.json' },
          },
          {
            loader: require.resolve('react-docgen-typescript-loader'),
          },
        ],
      }
    )
    // return config;

    // config.module.rules.push(
    //   {
    //     test: /\.svg$/,
    //     use: [
    //       {
    //         loader: 'babel-loader',
    //       },
    //       {
    //         loader: 'react-svg-loader',
    //         options: {
    //           jsx: true, // true outputs JSX tags
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     test: /\.(ts|tsx)$/,
    //     use: [
    //       {
    //         loader: require.resolve('ts-loader'),
    //         options: { configFile: 'tsconfig.storybook.json' },
    //       },
    //       {
    //         loader: require.resolve('react-docgen-typescript-loader'),
    //       },
    //     ],
    //   }
    // )
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}
