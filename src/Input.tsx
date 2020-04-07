import React from 'react'
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/core'
import { useDebouncedCallback } from 'use-debounce'

import { Icon } from './Icon'
import { Modify } from './utils'

type InputProps = Modify<
  ChakraInputProps,
  {
    onChange: (value: string) => void
  }
>

export const Input = ({ onChange, ...props }: InputProps) => {
  const [debouncedCallback] = useDebouncedCallback((value: string) => {
    onChange(value)
  }, 1000)

  return (
    <InputGroup>
      <InputLeftElement children={<Icon name="search" />} />
      <ChakraInput
        placeholder="image search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          debouncedCallback(e.target.value)
        }
        {...{ borderRadius: '20px' }}
        {...props}
      />
      <InputRightElement children={<Icon name="close" />} />
    </InputGroup>
  )
}
