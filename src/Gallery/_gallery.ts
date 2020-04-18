import { useRef, useCallback, useEffect, Dispatch, useMemo } from 'react'
import wretch from 'wretch'
import { usePaginatedQuery, queryCache, useQuery } from 'react-query'
// import useSWR from 'swr'
import { createContext } from '../lib/contextStore'
import { useReducer, useState } from 'reinspect'

import { Config, TRow, Source } from './types'
import { useTransformList } from './$gallery/List'

const fetchGallery = (key: any, searchTerm: string, config: Config, page: number) => {
  console.log('fetching', key, searchTerm, page)
  return wretch(`${config.url}&per_page=${config.perPage}&page=${page + 1}&query=${searchTerm}`)
    .get()
    .setTimeout(1000)
    .json()
    .then((data) => data.results)
}

const useInfiniteQuery = (query: any, variables: any, fetch: any) => {
  const [fetchingMore, setFetchingMore] = useState(false, 'setFetchingMore')
  const [page, setPage] = useState(1, 'setPage')

  const { status, data } = useQuery(query && [...query, fetchingMore ? page + 1 : page], variables, fetch, {
    staleTime: Infinity,
    cacheTime: 0,
    onSuccess() {
      if (fetchingMore) {
        setFetchingMore(false)
        setPage((page) => page + 1)
      }
    },
  })
  console.log('page', page)

  const fetchMore = useCallback(() => {
    setFetchingMore(true)
  }, [])

  return useMemo(() => ({ status, data, fetchMore }), [status, data, fetchMore])
}

interface TState {
  searchTerm: string
  page: number
  fetchingMore: boolean
  isLoading: boolean
}

type Actions = 'setSearchTerm' | 'reset' | 'setLoading'

const initialState: TState = { searchTerm: '', page: 1, fetchingMore: false, isLoading: false }
const reducer = (state: TState, action: { type: Actions; payload?: any }) =>
  ({
    setSearchTerm: () => {
      console.log(' action.payload', action.payload)
      return {
        ...state,
        searchTerm: action.payload,
        // page: initialState.page,
        // rows: initialState.rows,
      }
    },
    // fetchMore: () => ({ ...state, fetchingMore: true }),
    // setRows: () => ({ ...state, rows: action.payload }),
    setLoading: () => ({ ...state, isLoading: action.payload }),
    reset: () => initialState,
    fetchMoreSuccess: () => ({ ...state, page: state.page + 1, fetchingMore: false }),
  }[action.type]?.() ?? state)

type SS = { rows: TRow[]; isLoading: boolean; config: Config; searchTerm: string; fetchMore: () => void }
const useGalleryState: (
  config: Config
) => [
  SS,
  Dispatch<{
    type: Actions
    payload?: any
  }>
] = (config) => {
  const [{ searchTerm, isLoading }, dispatch] = useReducer(
    reducer,
    initialState,
    (state) => ({ ...state, searchTerm: 'b' }),
    'gallery'
  )

  const { status, data, fetchMore } = useInfiniteQuery(
    searchTerm && ['gallery', searchTerm, config],
    [config],
    fetchGallery
  )

  const rows = useTransformList(config, data)

  useEffect(() => {
    if (status === 'loading') {
      dispatch({ type: 'setLoading', payload: true })
    } else {
      dispatch({ type: 'setLoading', payload: true })
      const tm = setTimeout(() => {
        dispatch({ type: 'setLoading', payload: false })
      }, 500)
      return () => clearTimeout(tm)
    }
    return
  }, [status])

  console.log('isLoading', isLoading)
  console.log('*****searchTerm', searchTerm)
  console.log('status', status)
  const s: SS = {
    isLoading,
    rows,
    searchTerm,
    config,
    fetchMore,
  }
  return [s, dispatch]
}

export const { Provider, useContext: useGalleryContext } = createContext(useGalleryState)

// const runOnce = (fn: (...a: any) => any) => {
//   let counter = 0
//   return () => {
//     counter += 1
//     if (counter === 1) {
//       fn()
//     }
//   }
// }
// const reducer = (state: any, action: any) => {
//   return {
//     setSearchTerm: { ...state, searchTerm: action.payload },
//   }[action.type]
// }

// function createReducer(initialState, handlers) {
//   return function reducer(state = initialState, action) {
//     if (handlers.hasOwnProperty(action.type)) {
//       return handlers[action.type](state, action)
//     } else {
//       return state
//     }
//   }
// }
// const todosReducer = createReducer([], {
//   set: addTodo,
//   TOGGLE_TODO: toggleTodo,
//   EDIT_TODO: editTodo,
// })
