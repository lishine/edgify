import React, { FC, useEffect, useMemo, useCallback, useRef } from 'react'
import { Flex, Image } from '@chakra-ui/core'
import { VariableSizeList } from 'react-window'
import { useState } from 'reinspect'
import { useUpdateEffect, useThrottleFn } from 'react-use'
import _throttle from 'lodash/throttle'

import { useGalleryContext } from '../../logic'
import { TRow, Config, Source } from '../../types'
import { appendRowsMasonry } from './calc'

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
    const [rows, setRows] = useState([] as TRow[], 'useTransformList:setRows')

    useUpdateEffect(() => {
        setRows((rows) => appendRowsMasonry(results, rows, config.nCols))
    }, [results, setRows, config])

    return {
        rows,
        reset: useCallback(() => {
            setRows([])
        }, []),
    }
}

type t = typeof useState

// export const useThrottle = (fn: (...args: number[]) => unknown, tm: number): t => {
//     const [s, setS] = useState(0, 'setVisibleStopIndex')
//     useThrottleFn(fn, tm, [s])
//     return [s, setS]
// }

// export const useThrottle = (fn: any, tm: any): any => {
// const [s, setS] = useState(0, 'setVisibleStopIndex')
// useThrottleFn(fn, tm, [s])
// return useMemo(() => [s, setS], [s])
// }

export const List = () => {
    const config = useGalleryContext((state) => state.config)
    const rows = useGalleryContext((state) => state.rows)
    const throttledFetchMore = useGalleryContext((state) => state.fetchMore)
    // console.log('rows', rows)

    const refState = useRef({ fetchMore: _throttle(() => throttledFetchMore(), 200) })
    const itemData = useMemo(() => ({ rows, config }), [rows, config])

    if (rows.length === 0) {
        return null
    }

    const { imageWidth, gapY, height, overscanCount } = config
    const width = window.innerWidth
    const itemSize = (i: number) => rows[i].height + gapY
    const itemCount = rows.length
    const estimatedItemSize = Math.round(imageWidth * 1.5)

    console.log('rendering List')
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
                    // console.log('rows.length', rows.length)
                    // console.log('visibleStopIndex', visibleStopIndex)
                    // console.log('------------')
                    refState.current.fetchMore()
                }
            }}
        >
            {Row}
        </VariableSizeList>
    )
}

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
// const width = (imageWidth + gapX) * nCols + 20
// const [, setVisibleStopIndex] = useThrottle(() => fetchMore(), 2000)
