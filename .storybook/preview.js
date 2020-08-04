import * as React from 'react'
import { Provider } from 'react-redux'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { addParameters } from '@storybook/react'
import { GlobalStyles } from '../src/storybook/GlobalStyles'
import { themes } from '../src/storybook/theme'
import { storySort } from '../src/storybook/storySorting'
import { store } from '../src/storybook/store/store'

addParameters({
  options: {
    storySort,
  },
})

addDecorator(withInfo)
addDecorator(withThemesProvider(themes))
addDecorator((storyFn) => (
  <Provider store={store}>
    <div>
      <GlobalStyles />
      {storyFn()}
    </div>
  </Provider>
))
