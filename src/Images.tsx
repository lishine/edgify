import React from 'react'
import { Flex, Image, Box } from '@chakra-ui/core'

const imageWidth = 150

export const Images = React.memo(({ data, ...props }: { data: any }) => (
  <Flex
    {...props}
    {...{
      w: 490,
      h: 1200,
      flexDirection: 'column',
      flexWrap: 'wrap',
      overflow: 'hidden',
    }}
  >
    {data?.results.map((result: any) => (
      <Box {...{ mr: 4, mb: 4, position: 'relative', w: imageWidth }} key={result.id}>
        <Image
          minWidth={imageWidth}
          position='absolute'
          src={`${result.urls.raw}&w=${imageWidth}`}
          // alt={result.alt_description}
        />
        <Box
          borderWidth={2}
          height={(result.height * imageWidth) / result.width}
        />
      </Box>
    ))}
  </Flex>
))
