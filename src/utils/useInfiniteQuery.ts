import { useState, useCallback } from 'react'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import { useDebounce } from 'use-debounce'
import { useUpdateEffect } from 'react-use'
import { useQuery } from 'react-query'

import { useReducer } from './useReducer'

export const useInfiniteQuery = (query: any, variables: any, fetch?: any, _options: Record<string, any> = {}) => {
    if (typeof variables !== 'function') {
        variables = Array.isArray(variables) ? variables : [variables]
    } else {
        fetch = variables
        variables = []
    }
    const { isLoadingDelayTransitionToLow = 50, ...options } = _options

    const [state, dispatch] = useReducer(
        (state, payload, initialState) => ({
            startFetchingMore: () => ({ ...state, fetchingMore: true }),
            startFetching: () => ({ ...initialState, fetching: true }),
            fetchingSuccess: () => ({
                ...state,
                page: state.fetchingMore ? state.page + 1 : state.page,
                fetchingMore: false,
                fetching: false,
                data: payload,
            }),
        }),
        { page: 1, fetching: false, fetchingMore: false, data: [] },
        'useInfiniteQuery'
    )

    const { data, refetch } = useQuery(
        query && [...query],
        [...variables, state.fetchingMore ? state.page + 1 : state.page],
        fetch,
        Object.assign(options, { manual: true })
    )
    useUpdateEffect(() => {
        dispatch({ type: 'fetchingSuccess', payload: data })
    }, [data])

    useDeepCompareEffectNoCheck(() => {
        dispatch({ type: 'startFetching' })
    }, [query])

    useUpdateEffect(() => {
        if (state.fetchingMore || state.fetching) {
            refetch({ force: true })
        }
    }, [state.fetching, state.fetchingMore])

    // isLoading Delay transition to false
    const [isLoading] = useDebounce(state.fetching || state.fetchingMore, isLoadingDelayTransitionToLow, {
        leading: state.fetching || state.fetchingMore === true,
    })

    return {
        isLoading,
        data: state.data,
        fetchMore: useCallback(() => dispatch({ type: 'startFetchingMore' }), []),
    }
}
