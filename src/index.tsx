import * as React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from '@chakra-ui/core'

import App from './App'
import { theme } from './theme'

const rootElement = document.getElementById('root')

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  rootElement
)
