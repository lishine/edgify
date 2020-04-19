import React, { FC, useEffect, useMemo, useCallback } from 'react'
import { Flex, Image } from '@chakra-ui/core'
import { VariableSizeList } from 'react-window'
import { useTimeoutFn } from 'react-use'
import { useState } from 'reinspect'

import { useGalleryContext } from '../../logic'
import { TRow, Config, Source } from '../../types'
import { createRowsMasonry } from './calc'

interface ItemData {
    rows: TRow[]
    config: Config
}
const Row: FC<{ index: number; style: any; data: ItemData }> = React.memo(({ index, style, data }) => {
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

export const useTransformList = (config: Config, results: Source[]) => {
    const [rows, setRows] = useState([] as TRow[], 'setRows')

    useEffect(() => {
        setRows((rows) => createRowsMasonry(results, rows, config.nCols))
    }, [results, setRows, config])

    return {
        rows,
        reset: useCallback(() => {
            setRows([])
        }, []),
    }
}

export const List = () => {
    const config = useGalleryContext((state) => state.config)
    const rows = useGalleryContext((state) => state.rows)
    const fetchMore = useGalleryContext((state) => state.fetchMore)
    console.log('rows', rows)

    // const [visibleStopIndex, setVisibleStopIndex] = useState(0, 'setVisibleStopIndex')
    // useEffect(() => {
    //   if (rows.length === 0) {
    //     setVisibleStopIndex(0)
    //   }
    // }, [rows.length])
    // const throtledVisibleStopIndex = useThrottle(visibleStopIndex, 300)
    // console.log('throtledVisibleStopIndex', throtledVisibleStopIndex)
    // useEffect(() => {
    //   if (rows.length && rows.length - throtledVisibleStopIndex < config.threshold) {
    //     fetchMore()
    //   }
    // }, [fetchMore, rows.length, throtledVisibleStopIndex, config.threshold])

    // const handleScroll = useCallback(
    // ({ visibleStopIndex }) => {
    // if (rows.length && rows.length - visibleStopIndex < config.threshold) {
    // console.log('------------')
    // fetchMore()
    // }
    // },
    // [rows.length, config.threshold, fetchMore]
    // )
    //

    const { imageWidth, gapX, gapY, height, nCols, overscanCount } = config
    // const width = (imageWidth + gapX) * nCols + 20
    const width = window.innerWidth
    const itemSize = (i: number) => rows[i].height + gapY
    const itemCount = rows.length
    const estimatedItemSize = Math.round(imageWidth * 1.5)
    const itemData = useMemo(() => ({ rows, config }), [rows, config])

    if (rows.length === 0) {
        return null
    }

    return (
        <VariableSizeList
            itemData={itemData}
            overscanCount={overscanCount}
            estimatedItemSize={estimatedItemSize}
            height={height}
            itemCount={itemCount}
            itemSize={itemSize}
            width={width}
            onItemsRendered={({ visibleStopIndex }) => {
                if (rows.length && rows.length - visibleStopIndex < config.threshold) {
                    console.log('rows.length', rows.length)
                    console.log('visibleStopIndex', visibleStopIndex)
                    console.log('------------')
                    fetchMore()
                }
            }}
        >
            {Row}
        </VariableSizeList>
    )
}
