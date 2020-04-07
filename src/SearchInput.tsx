import React from 'react'
import {
  Input,
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

export const SearchInput = ({ onChange, ...props }: InputProps) => {
  const [debouncedCallback] = useDebouncedCallback((value: string) => {
    onChange(value)
  }, 700)

  return (
    <InputGroup>
      <InputLeftElement children={<Icon name="search" />} />
      <Input
        type="search"
        autoComplete="text"
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
