import React, { FC, useEffect, useMemo, useCallback, useRef } from 'react'
import { Flex, Image } from '@chakra-ui/core'
import { VariableSizeList } from 'react-window'
import { useState } from 'reinspect'
import { useUpdateEffect, useThrottleFn } from 'react-use'
import _once from 'lodash/once'

import { useGalleryContext } from '../../_gallery'
import { TRow, Config, Source } from '../../types'
import { appendRowsMasonry } from './appendRowsMasonry'

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

export const useAppendInfiniteList = (config: Config, results: Source[]) => {
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

export const InfiniteList = () => {
    const config = useGalleryContext((state) => state.config)
    const rows = useGalleryContext((state) => state.rows)
    const fetchMore = useGalleryContext((state) => state.fetchMore)

    const onceFetchMore = useCallback(
        _once(() => fetchMore()),
        [rows.length]
    )
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
                    onceFetchMore()
                }
            }}
        >
            {Row}
        </VariableSizeList>
    )
}
