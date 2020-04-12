import React from 'react'

import { CSSReset } from '@chakra-ui/core'
import { Global } from '@emotion/core'
import { ReactQueryConfigProvider } from 'react-query'

import { Gallery } from './Gallery/Gallery'
import { PerformanceTest } from './lib/PerformanceTest'

export default () => (
  <ReactQueryConfigProvider config={{ refetchAllOnWindowFocus: false }}>
    <CSSReset />
    <Global
      styles={{
        '::-webkit-search-cancel-button': {
          WebkitAppearance: 'none',
        },
        body: {
          backgroundColor: 'green',
        },
      }}
    />
    <PerformanceTest />
    <Gallery />
  </ReactQueryConfigProvider>
)
