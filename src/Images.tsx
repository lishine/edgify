import React from 'react'
import { Flex, Image } from '@chakra-ui/core'

export const Images = React.memo(({ urls, ...props }: { urls: any }) => (
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
    {urls.map((url: any, i: number) => (
      <Image
        maxWidth={150}
        key={i}
        src={`${url.raw}&w=150`}
        alt=''
        {...{ mr: 4, mb: 4 }}
      />
    ))}
  </Flex>
))
