import React from 'react'
import { Text, Grid, Box, Progress } from '@chakra-ui/core'
import wretch from 'wretch'
import { useQuery } from 'react-query'

import { SearchInput } from './SearchInput'
import { Images } from './Images'

const fetch = (searchTerm: string) => {
  console.log('fetch')
  return wretch(
    `https://api.unsplash.com/search/photos?client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b&per_page=20&query=${searchTerm}`
  )
    .get()
    .setTimeout(1000)
    .json()
}

export const Gallery = () => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const { status, data } = useQuery([searchTerm], fetch)

  return (
    <Grid
      {...{
        mx: 'auto',
        mt: 10,
        w: 850,
      }}
      style={{ placeItems: 'center' }}
    >
      <Box {...{ mx: 10, justifySelf: 'stretch' }}>
        <SearchInput
          value={searchTerm}
          onChange={(value) => setSearchTerm(value)}
        />
        {status === 'loading' && (
          <Box position='relative'>
            <Progress
              {...{
                position: 'absolute',
                rounded: 'xxl',
                w: '100%',
                mt: 4,
                color: 'gray',
              }}
              value={60}
              hasStripe
              isAnimated
            />
          </Box>
        )}
      </Box>
      <Box>
        <Text {...{ my: 10, fontWeight: 600 }}>{searchTerm}</Text>
        <Images {...{}} data={data} />
      </Box>
    </Grid>
  )
}
