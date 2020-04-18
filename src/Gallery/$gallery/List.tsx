import React, { FC, useEffect } from 'react'
import { Flex, Image } from '@chakra-ui/core'
import { VariableSizeList } from 'react-window'
import { useQuery } from 'react-query'
import { useThrottle } from 'react-use'
import memoize from 'memoize-one'
import { useReducer, useState } from 'reinspect'

import { useGalleryContext } from '../_gallery'
import { TRow, Config, Source } from '../types'
import { calcRows } from '../calc'

interface ItemData {
  rows: TRow[]
  config: Config
}
const Row: FC<{ index: number; style: any; data: ItemData }> = React.memo(({ index, style, data }) => {
  console.log('i', index)
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
})

export const useTransformList = (config: Config, data: Source[]) => {
  const [rows, setRows] = useState([] as TRow[], 'setRows')

  useEffect(() => {
    setRows((rows) => calcRows(data, rows, config))
  }, [data, setRows, config])

  return rows
}

export const List = () => {
  const config = useGalleryContext(([state]) => state.config)
  const rows = useGalleryContext(([state]) => state.rows)
  const fetchMore = useGalleryContext(([state]) => state.fetchMore)
  // const { rows, fetchMore } = useUnsplash()
  // const dispatch = useGalleryContext(([, dispatch]) => dispatch)
  // const { data: rows = [], ...rest } = useQuery('gallery-rows', undefined, { manual: true })
  // const { data: rows = [], ...rest } = useQuery('gallery', undefined, { manual: true })
  // console.log('rest', rest)
  const [visibleStopIndex, setVisibleStopIndex] = useState(0, 'setVisibleStopIndex')
  console.log('rows', rows)
  // const rows: TRow[] = []
  // const rows: TRow[] = useQuery('gallery')
  // return null

  useEffect(() => {
    if (rows.length === 0) {
      setVisibleStopIndex(0)
    }
  }, [rows.length])

  const throtledVisibleStopIndex = useThrottle(visibleStopIndex, 300)
  console.log('throtledVisibleStopIndex', throtledVisibleStopIndex)
  useEffect(() => {
    if (rows.length && rows.length - throtledVisibleStopIndex < config.threshold) {
      fetchMore()
    }
  }, [fetchMore, rows.length, throtledVisibleStopIndex, config.threshold])

  // if (rows.length === 0) {
  // console.log('returning null')
  // return null
  // }

  const { imageWidth, gapX, gapY, height, nCols, overscanCount } = config

  // const width = (imageWidth + gapX) * nCols + 20
  const width = window.innerWidth
  const itemSize = (i: number) => rows[i].height + gapY
  const itemCount = rows.length
  const estimatedItemSize = Math.round(imageWidth * 1.5)
  const itemData = React.useMemo(() => ({ rows, config }), [rows, config])

  return (
    <VariableSizeList
      itemData={itemData}
      overscanCount={overscanCount}
      estimatedItemSize={estimatedItemSize}
      height={height}
      itemCount={itemCount}
      itemSize={itemSize}
      width={width}
      onItemsRendered={(p) => {
        console.log('rows.length', rows.length)
        console.log('visibleStopIndex', visibleStopIndex)
        // if (p.visibleStopIndex > visibleStopIndex) {
        setVisibleStopIndex(p.visibleStopIndex)
        // }
      }}
    >
      {Row}
    </VariableSizeList>
  )
}
