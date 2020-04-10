import React from 'react'
import { Flex, FlexProps, Image, Box } from '@chakra-ui/core'

import { useGalleryContext } from './Gallery'

const imageWidth = 150

export const Images = (props: FlexProps) => {
  const data = useGalleryContext((state) => state.data)

  console.log('rendering Images', data)
  return (
    <Flex {...props} {...{ w: 490, h: 1200, flexDirection: 'column', flexWrap: 'wrap', overflow: 'hidden' }}>
      {data?.results.map((result: any) => (
        <Box key={result.id} {...{ mr: 4, mb: 4, position: 'relative', w: imageWidth }}>
          <Image
            minWidth={imageWidth}
            position='absolute'
            src={`${result.urls.raw}&w=${imageWidth}`}
            // alt={result.alt_description}
          />
          <Box borderWidth={2} height={(result.height * imageWidth) / result.width} />
        </Box>
      ))}
    </Flex>
  )
}
