import React from 'react'
import { Box, Progress as _Progress } from '@chakra-ui/core'

import { useGalleryState } from './GalleryState'

export const Progress = () => {
  const isLoading = useGalleryState((state) => state.isLoading)
  console.log('rendering Progress')

  if (!isLoading) {
    return null
  }
  return (
    <Box position='relative'>
      <_Progress
        {...{ position: 'absolute', rounded: 'xxl', w: '100%', mt: 4, color: 'gray' }}
        value={60}
        hasStripe
        isAnimated
      />
    </Box>
  )
}
