import { useEffect, useMemo, useCallback } from 'react'
import wretch from 'wretch'
import { useQuery } from 'react-query'
// import useSWR from 'swr'
import { createContext } from '../lib/contextStore'
import { useState } from 'reinspect'
import { useFirstMountState, useTimeoutFn } from 'react-use'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'

import { Config } from './types'
import useDebounceWhen, { useReducer } from '../utils'
import { useTransformList } from './view/List/List'

// images data comes with full height and width
export const calcImageScaledHeight = (height: number, width: number, imageWidth: number) =>
  (height * imageWidth) / width

export const prepareResults = (data: any, imageWidth: number) =>
  data?.results.map(({ urls, height, width, ...rest }: any) => ({
    url: urls.raw,
    height: calcImageScaledHeight(height, width, imageWidth),
    width,
    ...rest,
  })) ?? []

const fetchGallery = (key: any, searchTerm: string, config: Config, page: number) => {
  console.log('fetching', key, searchTerm, page)
  return wretch(`${config.url}&per_page=${config.perPage}&page=${page + 1}&query=${searchTerm}`)
    .get()
    .setTimeout(1000)
    .json()
    .then((data) => prepareResults(data, config.imageWidth))
}

const useInfiniteQuery = (query: any, variables: any, fetch?: any) => {
  fetch = fetch ? fetch : variables
  const [state, dispatch] = useReducer(
    (state, payload, initialState) => ({
      reset: () => initialState,
      fetchMore: () => ({ ...state, fetchingMore: true }),
      // setLoading: () => ({ ...state, isLoading: payload }),
      // setData: () => ({ ...state, data: payload }),
      fetchMoreSuccess: () => ({ ...state, page: state.page + 1, fetchingMore: false }),
    }),
    // { page: 1, fetchingMore: false, data: undefined, isLoading: false },
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

  // useEffect(() => {
  // dispatch({ type: 'setLoading', payload: status === 'loading' })
  // }, [status])
  const fetchMore = useCallback(() => dispatch({ type: 'fetchMore' }), [])

  return useMemo(() => ({ status, data, fetchMore }), [status, data, fetchMore])
  // return useMemo(
  //   () => ({ isLoading: state.isLoading, data: state.data, fetchMore: () => dispatch({ type: 'fetchMore' }) }),
  //   [state.data, state.isLoading]
  // )
}

// const useHoldValueLonger = (value: any, holdValueLonger: any) => {
//   useEffect(() => {
//     if (value === 'loading') {
//       setLoading(true)
//     } else {
//       setIsLoading(true)
//       const tm = setTimeout(() => {
//         setIsLoading(false)
//       }, 500)
//       return () => clearTimeout(tm)
//     }
//     return
//   }, [value])
// }

const useGalleryState = (config: Config) => {
  const [state, dispatch] = useReducer(
    (state, payload) => ({
      setLoading: () => ({ ...state, isLoading: payload }),
      setSearchTerm: () => ({ ...state, searchTerm: payload }),
    }),
    { isLoading: false, searchTerm: 'b' },
    'gallery'
  )
  // const [isLoading, setIsLoading] = useState(false, 'setIsLoading')
  // const [searchTerm, setSearchTerm] = useState('b', 'setSearchTerm')

  const { status, data, fetchMore } = useInfiniteQuery(
    state.searchTerm && ['gallery', state.searchTerm, config],
    fetchGallery
  )
  const { rows, reset } = useTransformList(config, data)

  useEffect(() => {
    reset()
  }, [state.searchTerm, reset])
  console.log('status === loading', status === 'loading')
  useDebounceWhen(
    () => {
      console.log('TTTT', status)
      dispatch({ type: 'setLoading', payload: status === 'loading' })
    },
    ([status]: [string]) => {
      console.log('HHHHHH', status)
      return status === 'loading'
    },
    1000,
    [status]
  )

  console.log('isLoading', state.isLoading)
  console.log('*****searchTerm', state.searchTerm)
  console.log('status', status)
  return {
    isLoading: state.isLoading,
    rows,
    searchTerm: state.searchTerm,
    config,
    fetchMore,
    setSearchTerm: useCallback((searchTerm) => dispatch({ type: 'setSearchTerm', payload: searchTerm }), []),
  }
}

export const { Provider, useContext: useGalleryContext } = createContext(useGalleryState)
