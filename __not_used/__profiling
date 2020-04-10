import React, { memo, useState, useReducer } from 'react'
// import { Profiler } from 'react'
import { Button } from '@chakra-ui/core'

import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { Global } from '@emotion/core'
import { ReactQueryConfigProvider } from 'react-query'

import { theme } from './theme'

import { Gallery } from './Gallery/Gallery'

export default () => {
  const forceUpdate = useReducer(() => ({}), {})[1] as () => void
  console.log('rendering App')
  return (
    <ThemeProvider theme={theme}>
      <ReactQueryConfigProvider config={{ refetchAllOnWindowFocus: false }}>
        <CSSReset />
        <Global styles={{ body: { backgroundColor: 'white' } }} />
        {/* <Profiler id='Under test' onRender={(params) => console.log(JSON.stringify(params, null, 2))}> */}
        <div>
          {[...Array(1000).keys()].map((i: number) => (
            <Comp key={i} />
          ))}
        </div>
        {/* </Profiler> */}
        <Button onClick={forceUpdate}>force update</Button>
        {/* <Gallery /> */}
      </ReactQueryConfigProvider>
    </ThemeProvider>
  )
}
