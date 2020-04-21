import { useState, useCallback } from 'react'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import { useDebounce } from 'use-debounce'
import { useUpdateEffect } from 'react-use'
import { useQuery } from 'react-query'

import { useReducer } from './useReducer'

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
        }),
        { page: 1, fetchingMore: false },
        'useInfiniteQuery'
    )

    const { data, isFetching, status } = useQuery(
        !!query && [...query, state.fetchingMore ? state.page + 1 : state.page],
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
