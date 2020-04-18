import React from 'react'
import { Box, Progress as CProgress } from '@chakra-ui/core'

import { useGalleryContext } from '../logic'

export const Progress = () => {
  const isLoading = useGalleryContext((state) => state.isLoading)

  if (!isLoading) {
    return null
  }

  console.log('rendering Progress')
  return (
    <Box position='relative'>
      <CProgress
        {...{ position: 'absolute', rounded: 'xxl', w: '100%', mt: 4, color: 'gray' }}
        value={60}
        hasStripe
        isAnimated
      />
    </Box>
  )
}
