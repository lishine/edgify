import React, { useState } from 'react'
import { Grid, Box, Heading, Button } from '@chakra-ui/core'
import wretch from 'wretch'
import { useQuery } from 'react-query'

import { SearchInput } from './SearchInput/SearchInput'
import { Images } from './Images'
import { Progress } from './Progress'
import { Title } from './Title'

import { createContext } from '../lib/contextStoreD'

const fetch = (searchTerm: string) =>
  wretch(
    `https://api.unsplash.com/search/photos?client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b&per_page=20&query=${searchTerm}`
  )
    .get()
    .setTimeout(1000)
    .json()

const useGalleryState = () => {
  console.log('state')
  const [searchTerm, setSearchTerm] = useState('')
  const { status, data } = useQuery([searchTerm], fetch)

  return {
    isLoading: status === 'loading',
    data,
    searchTerm,
    setSearchTerm,
  }
}

export const { Provider, useContext: useGalleryContext } = createContext(useGalleryState)

export const Gallery = () => (
  <Provider>
    <Grid {...{ mx: 'auto', mt: 10, w: 850 }} style={{ placeItems: 'center' }}>
      <Heading size='lg' {...{ mb: 6 }}>
        Search Unsplash
      </Heading>
      <Box {...{ mx: 10, justifySelf: 'stretch' }}>
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
