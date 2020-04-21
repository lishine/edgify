import React from 'react'
import { IconButton as ChakraIconButton, Icon as ChakraIcon, IconProps, IconButtonProps } from '@chakra-ui/core'

export const IconButton = (props: IconButtonProps) => (
    <ChakraIconButton {...props} _hover={{ bg: 'white' }} isRound color='#888888' />
)

export const Icon = (props: IconProps) => <ChakraIcon {...props} color='#888888' />
