import React from 'react'

import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { Global } from '@emotion/core'
import { ReactQueryConfigProvider } from 'react-query'

import { theme } from './theme'

import { Gallery } from './Gallery/Gallery'

export default () => (
  <ThemeProvider theme={theme}>
    <ReactQueryConfigProvider config={{ refetchAllOnWindowFocus: false }}>
      <CSSReset />
      <Global styles={{ body: { backgroundColor: 'white' } }} />
      <Gallery />
    </ReactQueryConfigProvider>
  </ThemeProvider>
)
