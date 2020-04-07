import React from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { Box } from '@chakra-ui/core'
import { Global } from '@emotion/core'

import { theme } from './theme'

import { Input } from './Input'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Global styles={{ body: { backgroundColor: 'green' } }} />
      <Box {...{ m: 10, w: '300px' }}>
        <Input onChange={() => console.log('here')} />
      </Box>
    </ThemeProvider>
  )
}
