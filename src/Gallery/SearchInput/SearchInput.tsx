import React, { useEffect, useState } from 'react'
import { Input, InputProps, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/core'
import { useDebouncedCallback } from 'use-debounce'
import { useGalleryContext } from '../Gallery'
import { Icon, IconButton } from './Icon'

export const SearchInput = (props: InputProps) => {
  const setSearchTerm = useGalleryContext((state) => state.setSearchTerm)
  const searchTerm = useGalleryContext((state) => state.searchTerm)
  const [innerValue, setInnerValue] = useState('')

  useEffect(() => {
    setInnerValue(searchTerm)
  }, [searchTerm])

  const [setDebounced] = useDebouncedCallback((value: string) => {
    setSearchTerm(value)
  }, 700)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInnerValue(newValue)
    setDebounced(newValue)
  }

  const handleReset = () => setSearchTerm('')

  console.log('rendering SearchInput')
  return (
    <InputGroup>
      <InputLeftElement children={<Icon name='search' size='15px' />} />
      <Input
        variant='filled'
        value={innerValue}
        autoComplete='text'
        placeholder='image search'
        onChange={handleChange}
        type='search'
        {...{ rounded: 'xxl', bg: '#EEEEEE', _hover: { borderColor: '#AAAAAA' }, _focus: { borderColor: '#AAAAAA' } }}
        {...props}
      />
      <InputRightElement
        children={<IconButton size='xs' variant='ghost' aria-label='reset' icon='close' onClick={handleReset} />}
      />
    </InputGroup>
  )
}
