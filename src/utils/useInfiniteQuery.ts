import { useCallback, useMemo } from 'react'
import { useFirstMountState } from 'react-use'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import { useQuery } from 'react-query'

import { useReducer } from './useReducer'

export const useInfiniteQuery = (query: any, variables: any, fetch?: any) => {
    fetch = fetch ? fetch : variables
    const [state, dispatch] = useReducer(
        (state, ___, initialState) => ({
            reset: () => initialState,
            fetchMore: () => ({ ...state, fetchingMore: true }),
            fetchMoreSuccess: () => ({ ...state, page: state.page + 1, fetchingMore: false }),
        }),
        { page: 1, fetchingMore: false },
        'useInfiniteQuery'
    )

    const isFirstMount = useFirstMountState()
    useDeepCompareEffectNoCheck(() => {
        if (isFirstMount) {
            dispatch({ type: 'reset' })
        }
    }, [query, isFirstMount])

    console.log('page fetchingMore', state.page, state.fetchingMore)
    const { status, data } = useQuery(
        query && [...query, state.fetchingMore ? state.page + 1 : state.page],
        variables,
        fetch,
        {
            staleTime: Infinity,
            cacheTime: 0,
            onSuccess() {
                // dispatch({ type: 'setData', payload: data })
                if (state.fetchingMore) {
                    dispatch({ type: 'fetchMoreSuccess' })
                }
            },
        }
    )

    const fetchMore = useCallback(() => dispatch({ type: 'fetchMore' }), [])

    return useMemo(() => ({ status, data, fetchMore }), [status, data, fetchMore])
}
