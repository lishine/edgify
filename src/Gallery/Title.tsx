import React from 'react'
import { Text } from '@chakra-ui/core'

import { useGalleryContext } from './Gallery'

export const Title = () => {
  const searchTerm = useGalleryContext((state) => state.searchTerm)

  console.log('rendering Title')
  return <Text {...{ my: 10, fontWeight: 600 }}>{searchTerm}</Text>
}
