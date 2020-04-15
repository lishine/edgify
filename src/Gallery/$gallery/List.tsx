import React, { FC, useState, useEffect } from 'react'
import { Flex, Image } from '@chakra-ui/core'
import { VariableSizeList } from 'react-window'

import { useGalleryContext } from '../_gallery'
import { TRow, Config } from '../types'

interface ItemData {
  rows: TRow[]
  config: Config
}
const Row: FC<{ index: number; style: any; data: ItemData }> = ({ index, style, data }) => {
  const { rows, config } = data
  const { cols } = rows?.[index]
  const { imageWidth, gapX } = config
  return (
    <Flex style={style} key={cols[0].id} {...{}}>
      {cols.map((col) => (
        <Image
          key={col.id}
          mr={`${gapX}px`}
          transform={`translateY(${Math.floor(col.offset)}px)`}
          height={col.height}
          width={imageWidth}
          src={`${col.url}&w=${imageWidth}`}
        />
      ))}
    </Flex>
  )
}

export const List = () => {
  const config = useGalleryContext(([state]) => state.config)
  const dispatch = useGalleryContext(([, dispatch]) => dispatch)
  const rows: TRow[] = useGalleryContext(([state]) => state.rows)
  const [visibleStopIndex, setVisibleStopIndex] = useState(0)
  // const rows: TRow[] = []
  // const rows: TRow[] = useQuery('gallery')
  // return null

  useEffect(() => {
    dispatch({ type: 'handleLoadMore', payload: rows.length - visibleStopIndex < config.threshold })
  }, [dispatch, rows.length, visibleStopIndex, config.threshold])

  if (rows.length === 0) {
    console.log('returning null')
    return null
  }

  const { imageWidth, gapX, gapY, height, nCols, overscanCount } = config

  const width = (imageWidth + gapX) * nCols + 20
  const itemSize = (i: number) => rows[i].height + gapY
  const itemCount = rows.length
  const estimatedItemSize = Math.round(imageWidth * 1.5)

  return (
    <VariableSizeList
      itemData={{ rows, config }}
      overscanCount={overscanCount}
      estimatedItemSize={estimatedItemSize}
      height={height}
      itemCount={itemCount}
      itemSize={itemSize}
      width={width}
      onItemsRendered={(p) => {
        console.log('rows.length', rows.length)
        console.log('visibleStopIndex', visibleStopIndex)
        if (p.visibleStopIndex > visibleStopIndex) {
          setVisibleStopIndex(p.visibleStopIndex)
        }
      }}
    >
      {Row}
    </VariableSizeList>
  )
}
