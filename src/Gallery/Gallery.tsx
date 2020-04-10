import React from 'react'
import { Text, Grid, Box } from '@chakra-ui/core'

import { SearchInput } from './SearchInput'
import { Images } from './Images'
import { Progress } from './Progress'
import { Title } from './Title'

import { GalleryStateProvider } from './GalleryState'

const A = () => {
  console.log('rendering A')
  return (
    <Grid {...{ mx: 'auto', mt: 10, w: 850 }} style={{ placeItems: 'center' }}>
      <Box {...{ mx: 10, justifySelf: 'stretch' }}>
        <SearchInput />
        <Progress />
      </Box>
      <Box>
        <Title />
        <Images />
      </Box>
    </Grid>
  )
}

export const Gallery = () => (
  <GalleryStateProvider>
    <A />
  </GalleryStateProvider>
)
