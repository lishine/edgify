import { useEffect, useMemo } from 'react'
import wretch from 'wretch'
import { useQuery } from 'react-query'
// import useSWR from 'swr'
import { createContext } from '../lib/contextStore'
import { useState } from 'reinspect'
import { useFirstMountState } from 'react-use'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'

import { Config } from './types'
import { useReducer } from '../utils'
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
      fetchMoreSuccess: () => ({ ...state, page: state.page + 1, fetchingMore: false }),
    }),
    { page: 1, fetchingMore: false },
    'useInfiniteQuery'
  )

  const isFirstMount = useFirstMountState()
  useDeepCompareEffectNoCheck(() => {
    if (isFirstMount) {
      console.log('*** setPage 1 query', query)
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
        if (state.fetchingMore) {
          dispatch({ type: 'fetchMoreSuccess' })
        }
      },
    }
  )

  return useMemo(() => ({ status, data, fetchMore: () => dispatch({ type: 'fetchMore' }) }), [status, data])
}

const useGalleryState = (config: Config) => {
  const [isLoading, setIsLoading] = useState(false, 'setIsLoading')
  const [searchTerm, setSearchTerm] = useState('b', 'setSearchTerm')

  const { status, data, fetchMore } = useInfiniteQuery(searchTerm && ['gallery', searchTerm, config], fetchGallery)
  const { rows, reset } = useTransformList(config, data)

  useEffect(() => {
    reset()
  }, [reset, searchTerm])

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true)
    } else {
      setIsLoading(true)
      const tm = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(tm)
    }
    return
  }, [status])

  console.log('isLoading', isLoading)
  console.log('*****searchTerm', searchTerm)
  console.log('status', status)
  return {
    isLoading,
    rows,
    searchTerm,
    config,
    fetchMore,
    setSearchTerm,
  }
}

export const { Provider, useContext: useGalleryContext } = createContext(useGalleryState)
