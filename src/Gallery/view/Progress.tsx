import React from 'react'
import { Box, Progress as _Progress } from '@chakra-ui/core'

import { useGalleryContext } from '../_gallery'

export const Progress = () => {
    const isLoading = useGalleryContext((state) => state.isLoading)

    // if (!isLoading) {
    //     return null
    // }

    console.log('rendering Progress')
    return (
        <Box minH='15px' mt={4} px={8}>
            {isLoading && (
                <_Progress {...{ rounded: 'xxl', w: '100%', color: 'gray' }} value={60} hasStripe isAnimated />
            )}
        </Box>
    )
}
