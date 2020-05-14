import React, { FC, useEffect, useMemo, useCallback, useRef } from 'react'
import { Flex, Image } from '@chakra-ui/core'
import { useVirtual } from 'react-virtual'
import _once from 'lodash/once'

import { useGalleryContext } from '../../_gallery'
import { TRow, Config } from '../../types'

const Row: FC<{ row: TRow; config: Config }> = React.memo(({ row, config }) => (
    <Flex key={row.cols[0].id}>
        {row.cols.map((col) => (
            <Image
                key={col.id}
                mr={`${config.gapX}px`}
                transform={`translateY(${Math.floor(col.offset)}px)`}
                height={col.height}
                width={config.imageWidth}
                src={`${col.url}&w=${config.imageWidth}`}
            />
        ))}
    </Flex>
))

export const InfiniteListVirtual = ({ parentRef }: any) => {
    const config = useGalleryContext((state) => state.config)
    const rows = useGalleryContext((state) => state.rows)
    const fetchMore = useGalleryContext((state) => state.fetchMore)

    const onceFetchMore = useCallback(
        _once(() => fetchMore()),
        [rows.length]
    )
    // const parentRef = React.useRef(null)

    const { gapY, height, overscanCount, threshold } = config

    const rowVirtualizer = useVirtual({
        size: rows.length,
        parentRef,
        estimateSize: React.useCallback((i = 0) => rows[i].height + gapY, [rows, gapY]),
        overscan: overscanCount,
    })

    useEffect(() => {
        if (
            rows.length &&
            rowVirtualizer.virtualItems.length &&
            rows.length - threshold < rowVirtualizer.virtualItems[rowVirtualizer.virtualItems.length - 1].index
        ) {
            onceFetchMore()
        }
    })

    if (rows.length === 0) {
        return null
    }

    console.log('rendering List')
    return (
        <div
            // ref={parentRef}
            data-id='List'
            style={{
                height,
                width: '550px',
                // overflow: 'auto',
            }}
        >
            <div
                data-id='ListInner'
                style={{
                    height: `${rowVirtualizer.totalSize}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {rowVirtualizer.virtualItems.map((virtualRow) => (
                    <div
                        data-id='Item'
                        key={virtualRow.index}
                        className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`,
                        }}
                    >
                        <Row row={rows[virtualRow.index]} config={config} />
                    </div>
                ))}
            </div>
        </div>
    )
}
