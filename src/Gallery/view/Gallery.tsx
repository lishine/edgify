import React, { FC, useRef } from 'react'
import { Grid, Box, Heading, Flex } from '@chakra-ui/core'

import { SearchInput } from './SearchInput/SearchInput'
import { InfiniteListWindow } from './List/InfiniteListWindow'
import { InfiniteListVirtual } from './List/InfiniteListVirtual'
import { Progress } from './Progress'
import { Title } from './Title'

import { Provider } from '../_gallery'
import { Config } from '../types'

export const Gallery: FC<Config> = (props) => {
    const parentRef = React.useRef(null)

    return (
        <Provider init={props}>
            <Box h='100vh'>
                <Flex
                    flexDirection='column'
                    alignItems='center'
                    w='calc(100% - 15px)'
                    position='fixed'
                    top={0}
                    left='0'
                    zIndex={10}
                    bg='teal.200'
                    py={4}
                >
                    <Heading size='lg' {...{ mb: 6 }}>
                        Search Unsplash
                    </Heading>
                    <Flex w='1000px' flexDirection='column'>
                        <SearchInput />
                        <Progress />
                    </Flex>
                    <Title />
                </Flex>
                <Flex pt='210px' justifyContent='center' overflow='auto' ref={parentRef}>
                    <Flex w='1200px' justifyContent='space-between'>
                        <Flex flexDirection='column' alignItems='center'>
                            <Heading mb={2}>React Window</Heading>
                            <InfiniteListWindow parentRef={parentRef} />
                        </Flex>
                        <Flex flexDirection='column' alignItems='center'>
                            <Heading mb={2}>React Virtual</Heading>
                            <InfiniteListVirtual parentRef={parentRef} />
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </Provider>
    )
}
