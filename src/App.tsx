import React from 'react'

import { CSSReset } from '@chakra-ui/core'
import { Global } from '@emotion/core'
import { ReactQueryConfigProvider } from 'react-query'

import { Gallery } from './Gallery/Gallery'

export default () => {
  return (
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
      <Gallery />
    </ReactQueryConfigProvider>
  )
}
