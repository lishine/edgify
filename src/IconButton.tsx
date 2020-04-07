import React from 'react'
import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/core'

export const IconButton = (props: IconButtonProps) => (
  <ChakraIconButton
    {...props}
    _hover={{ bg: 'white' }}
    isRound
    color='#888888'
  />
)
