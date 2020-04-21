import React, { FC } from 'react'
import { Grid, Box, Heading } from '@chakra-ui/core'

import { SearchInput } from './SearchInput/SearchInput'
import { InfiniteList } from './List/InfiniteList'
import { Progress } from './Progress'
import { Title } from './Title'

import { Provider } from '../_gallery'
import { Config } from '../types'

export const Gallery: FC<Config> = (props) => (
    <Provider init={props}>
        <Grid {...{ mr: 'auto', ml: 100, mt: 10 }} style={{ placeItems: 'center' }}>
            <Heading size='lg' {...{ mb: 6 }}>
                Search Unsplash
            </Heading>
            <Box {...{ w: 1000, max: 'auto' }}>
                <SearchInput />
                <Progress />
            </Box>
            <Box>
                <Title />
                <InfiniteList />
            </Box>
        </Grid>
    </Provider>
)
