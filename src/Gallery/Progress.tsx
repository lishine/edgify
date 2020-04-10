import React from 'react'
import { Box, Progress as _Progress } from '@chakra-ui/core'

import { useGalleryContext } from './Gallery'

export const Progress = () => {
  const isLoading = useGalleryContext((state) => state.isLoading)

  if (!isLoading) {
    return null
  }

  console.log('rendering Progress')
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
