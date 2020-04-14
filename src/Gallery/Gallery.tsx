import React from 'react'
import { Grid, Box, Heading } from '@chakra-ui/core'

import { SearchInput } from './SearchInput/SearchInput'
import { Images } from './List/List'
import { Progress } from './Progress'
import { Title } from './Title'

import { Provider } from './_gallery'

export const Gallery = () => (
  <Provider>
    <Grid {...{ mx: 'auto', mt: 10, w: 1550 }} style={{ placeItems: 'center' }}>
      <Heading size='lg' {...{ mb: 6 }}>
        Search Unsplash
      </Heading>
      <Box {...{ w: 1000, max: 'auto' }}>
        <SearchInput />
        <Progress />
      </Box>
      <Box>
        <Title />
        <Images />
      </Box>
    </Grid>
  </Provider>
)
