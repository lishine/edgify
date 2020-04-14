import React from 'react'
import { Flex, Image } from '@chakra-ui/core'
import { VariableSizeList } from 'react-window'

import { useGalleryContext } from '../_gallery'
import { calcRows, Source, TRow } from './calc'

const imageWidth = 250
const HEIGHT = window.innerHeight - 300
const N_COLS = 2
const gapX = 10
const gapY = 10

let rows: TRow[] = []

const Row = ({ index, style }: any) => {
  const { cols } = rows[index]
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

export const Images = () => {
  const sources: Source[] = useGalleryContext((state) => state.data?.results)
  if (!sources) {
    return null
  }

  rows = calcRows(sources, [], N_COLS, imageWidth)

  return (
    <VariableSizeList
      estimatedItemSize={Math.round(imageWidth * 1.5)}
      height={HEIGHT}
      itemCount={rows?.length ?? 0}
      itemSize={(i: number) => rows[i].height + gapY}
      width={(imageWidth + gapX) * N_COLS + 20}
    >
      {Row}
    </VariableSizeList>
  )
}
