import React, { useEffect, useState, useCallback } from 'react'
import {
  Input,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/core'
import { useDebouncedCallback } from 'use-debounce'

import { Icon, IconButton } from './Icon'

import { Modify } from './utils'

type InputProps = Modify<
  ChakraInputProps,
  {
    onChange: (value: string) => void
    value: string
  }
>

export const SearchInput = ({ onChange, value, ...props }: InputProps) => {
  const [innerValue, setInnerValue] = useState('')

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  const [debouncedHandleOnChange] = useDebouncedCallback((value: string) => {
    onChange(value)
  }, 700)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInnerValue(newValue)
      debouncedHandleOnChange(newValue)
    },
    [debouncedHandleOnChange]
  )
  const handleReset = () => onChange('')

  return (
    <InputGroup>
      <InputLeftElement
        children={
          <Icon
            // isDisabled
            // isLoading={isLoading}
            // aria-label='search'
            // icon='search'
            name='search'
            size='15px'
            // variant='ghost'
          />
        }
      />
      <Input
        variant='filled'
        value={innerValue}
        // type='search'
        autoComplete='text'
        placeholder='image search'
        onChange={handleChange}
        {...{
          rounded: 'xxl',
          bg: '#EEEEEE',
          _hover: { borderColor: '#AAAAAA' },
          _focus: { borderColor: '#AAAAAA' },
        }}
        {...props}
      />
      <InputRightElement
        children={
          <IconButton
            size='xs'
            variant='ghost'
            aria-label='reset'
            icon='close'
            onClick={handleReset}
          />
        }
      />
    </InputGroup>
  )
}
