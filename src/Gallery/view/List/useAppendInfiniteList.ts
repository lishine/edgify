import React, { FC, useEffect, useMemo, useCallback, useRef } from 'react'
import { useState } from 'reinspect'
import { useUpdateEffect, useThrottleFn } from 'react-use'

import { TRow, Config, Source } from '../../types'
import { appendRowsMasonry } from './appendRowsMasonry'

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
