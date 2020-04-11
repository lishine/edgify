import React from 'react'

import { CSSReset, Button, Flex, Heading, Stack, useToast } from '@chakra-ui/core'
import { Global, css } from '@emotion/core'
import { ReactQueryConfigProvider } from 'react-query'

import { Gallery } from './Gallery/Gallery'
import { PerformanceTest } from './lib/PerformanceTest'

export default () => (
  <ReactQueryConfigProvider config={{ refetchAllOnWindowFocus: false }}>
    <CSSReset />
    <Global
      styles={css`
        ::-webkit-search-cancel-button {
          -webkit-appearance: 'none';
        }
        body: {
          background-color: white;
        }
      `}
    />
    <PerformanceTest />
    <Gallery />
  </ReactQueryConfigProvider>
)
