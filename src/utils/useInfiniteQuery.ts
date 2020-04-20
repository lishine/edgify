import { useState } from 'react'

import { useRef } from 'react'
import { useDeepCompareUpdateEffectNoCheck } from './useDeepCompareUpdateEffectNoCheck'
import { useQuery } from 'react-query'

const initial = { page: 1 }

export const useInfiniteQuery = (query: any, variables: any, fetch?: any) => {
    if (fetch === undefined) {
        fetch = variables
        variables = []
    } else {
        variables = Array.isArray(variables) ? variables : [variables]
    }

    const [fetchingMore, setFetchingMore] = useState(false)
    const state = useRef(initial)
    useDeepCompareUpdateEffectNoCheck(() => {
        state.current = initial
        setFetchingMore(false)
    }, [query])

    // console.log('useInfiniteQuery state', state)
    const { status, data, refetch } = useQuery(
        query && [...query],
        [...variables, fetchingMore ? state.current.page + 1 : state.current.page],
        fetch,
        {
            staleTime: Infinity,
            cacheTime: 0,
            onSuccess() {
                if (fetchingMore) {
                    state.current.page += 1
                    setFetchingMore(false)
                }
            },
        }
    )
    console.log('page', state.current.page)

    const fetchMore = () => {
        setFetchingMore(true)
        refetch({ force: true })
    }

    return { status: fetchingMore ? 'loading' : status, data, fetchMore }
}
// export const useInfiniteQuery = (query: any, variables: any, fetch?: any) => {
//     fetch = fetch ? fetch : variables
//     const [state, dispatch] = useReducer(
//         (state, ___, initialState) => ({
//             reset: () => initialState,
//             fetchMore: () => ({ ...state, fetchingMore: true }),
//             fetchMoreSuccess: () => ({ ...state, page: state.page + 1, fetchingMore: false }),
//         }),
//         { page: 1, fetchingMore: false },
//         'useInfiniteQuery'
//     )

//     const isFirstMount = useFirstMountState()
//     useDeepCompareEffectNoCheck(() => {
//         if (isFirstMount) {
//             dispatch({ type: 'reset' })
//         }
//     }, [query, isFirstMount])

//     console.log('page fetchingMore', state.page, state.fetchingMore)
//     const { status, data } = useQuery(
//         query && [...query, state.fetchingMore ? state.page + 1 : state.page],
//         variables,
//         fetch,
//         {
//             staleTime: Infinity,
//             cacheTime: 0,
//             onSuccess() {
//                 // dispatch({ type: 'setData', payload: data })
//                 if (state.fetchingMore) {
//                     dispatch({ type: 'fetchMoreSuccess' })
//                 }
//             },
//         }
//     )

//     const fetchMore = useCallback(() => dispatch({ type: 'fetchMore' }), [])

//     return useMemo(() => ({ status, data, fetchMore }), [status, data, fetchMore])
// }

// const [state, dispatch] = useReducer(
// (state, ___, initialState) => ({
// reset: () => initialState,
// fetchMore: () => ({ ...state, fetchingMore: true }),
// fetchMoreSuccess: () => ({ ...state, page: state.page + 1, fetchingMore: false }),
// }),
// { page: 1, fetchingMore: false },
// 'useInfiniteQuery'
// )
