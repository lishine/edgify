import React from 'react'
import { Text } from '@chakra-ui/core'

import { useGalleryState } from './GalleryState'

export const Title = () => {
  const searchTerm = useGalleryState((state) => state.searchTerm)
  console.log('rendering Title')

  return <Text {...{ my: 10, fontWeight: 600 }}>{searchTerm}</Text>
}
