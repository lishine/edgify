import React, { useEffect, useState } from 'react'
import { Input, InputProps, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/core'
import { useDebouncedCallback } from 'use-debounce'

import { useGalleryState } from './GalleryState'
import { Icon, IconButton } from './Icon'

// import { Modify } from '../utils'

// type InputProps = Modify<
//   ChakraInputProps,
//   {
//     onChange: (value: string) => void
//     value: string
//   }
// >

export const SearchInput = (props: InputProps) => {
  console.log('rendering SearchInput')
  const setSearchTerm = useGalleryState((state) => state.setSearchTerm)
  const searchTerm = useGalleryState((state) => state.searchTerm)
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
        {...{ rounded: 'xxl', bg: '#EEEEEE', _hover: { borderColor: '#AAAAAA' }, _focus: { borderColor: '#AAAAAA' } }}
        {...props}
      />
      <InputRightElement
        children={<IconButton size='xs' variant='ghost' aria-label='reset' icon='close' onClick={handleReset} />}
      />
    </InputGroup>
  )
}
