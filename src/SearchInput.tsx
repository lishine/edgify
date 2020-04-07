import React, { useEffect, useState, useCallback } from 'react'
import {
  Input,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/core'
import { useDebouncedCallback } from 'use-debounce'

import { IconButton } from './IconButton'

import { Modify } from './utils'

type InputProps = Modify<
  ChakraInputProps,
  {
    onChange: (value: string) => void
    isLoading: boolean
    value: string
  }
>

export const SearchInput = ({
  onChange,
  value,
  isLoading,
  ...props
}: InputProps) => {
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
          <IconButton
            isLoading={isLoading}
            aria-label='search'
            icon='search'
            size='sm'
            variant='ghost'
          />
        }
      />
      <Input
        variant='filled'
        value={innerValue}
        type='search'
        autoComplete='text'
        placeholder='image search'
        onChange={handleChange}
        {...{ rounded: 'xxl', bg: '#EEEEEE' }}
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
