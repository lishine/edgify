import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/core'

export const Images = ({ urls, ...props }: { urls: any }) => {
  console.log('urls', urls)
  return (
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
      {urls.map((url: any) => (
        <Image src={`${url.raw}&w=150`} alt="" {...{ mr: 4, mb: 4 }} />
      ))}
    </Flex>
  )
}
