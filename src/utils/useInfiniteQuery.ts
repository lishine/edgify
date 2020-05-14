import { useState, useCallback, useRef } from 'react'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import { useDebounce } from 'use-debounce'
import { useUpdateEffect } from 'react-use'
import { useQuery } from 'react-query'

import { useReducer } from './useReducer'
import { useDeepCompareUpdateEffectNoCheck } from './useDeepCompareUpdateEffectNoCheck'

export const useInfiniteQuery = (query: any, variables: any, fetch?: any, options?: Record<string, any>) => {
    if (typeof variables !== 'function') {
        variables = Array.isArray(variables) ? variables : [variables]
    } else {
        options = fetch
        fetch = variables
        variables = []
    }
    options = options ?? fetch
    const { isLoadingDelayTransitionToLow = 50, onSuccess, ..._options } = options ?? {}

    const [state, dispatch] = useReducer(
        (state, payload, initialState) => ({
            fetchMore: () => ({ ...state, fetchingMore: true }),
            fetchingMoreSuccess: () => ({
                ...state,
                page: state.page + 1,
                fetchingMore: false,
            }),
            setQuery: () => ({
                ...initialState,
                query: payload,
            }),
        }),
        { page: 1, fetchingMore: false, query: [] },
        'useInfiniteQuery'
    )
    useDeepCompareEffectNoCheck(() => {
        dispatch({ type: 'setQuery', payload: query || [] })
    }, [query])

    const { data, status } = useQuery(
        state.query.length > 0 && [...state.query, state.fetchingMore ? state.page + 1 : state.page],
        variables,
        fetch,
        {
            onSuccess(_data: any) {
                if (state.fetchingMore) {
                    dispatch({ type: 'fetchingMoreSuccess' })
                }
                onSuccess && onSuccess(_data)
            },
            ..._options,
        }
    )

    // isLoading Delay transition to false
    const [isLoading] = useDebounce(status === 'loading', isLoadingDelayTransitionToLow, {
        leading: status === 'loading',
    })

    return {
        isLoading,
        data,
        fetchMore: useCallback(() => dispatch({ type: 'fetchMore' }), []),
    }
}
