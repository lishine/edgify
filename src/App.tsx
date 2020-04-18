import React from 'react'

import { CSSReset } from '@chakra-ui/core'
import { Global } from '@emotion/core'
import { ReactQueryConfigProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import { StateInspector } from 'reinspect'

import { Gallery } from './Gallery/view/Gallery'

export default () => {
  return (
    <StateInspector name='App'>
      <ReactQueryConfigProvider config={{ refetchAllOnWindowFocus: false }}>
        <>
          <ReactQueryDevtools initialIsOpen={false} />
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
          <Gallery
            {...{
              url:
                'https://api.unsplash.com/search/photos?client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b',
              imageWidth: 250,
              height: window.innerHeight - 300,
              nCols: 2,
              gapX: 10,
              gapY: 10,
              perPage: 30,
              overscanCount: 5,
              threshold: 16,
            }}
          />
        </>
      </ReactQueryConfigProvider>
    </StateInspector>
  )
}
