import { useState, useRef, useCallback, useEffect, useReducer, Dispatch } from 'react'
import wretch from 'wretch'
import { usePaginatedQuery, queryCache, useInfiniteQuery, useQuery } from 'react-query'
// import useSWR from 'swr'
import { createContext } from '../lib/contextStore'
import { useThrottle } from 'react-use'

import { Config, TRow, Source } from './types'
import { calcRows } from './calc'

const fetchGallery = (key: any, config: Config, searchTerm: string, page: number) => {
  console.log('fetching', key, searchTerm, page)
  return wretch(`${config.url}&per_page=${config.perPage}&page=${page}&query=${searchTerm}`)
    .get()
    .setTimeout(1000)
    .json()
    .then((data) => data.results)
}

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

interface TState {
  searchTerm: string
  rows: TRow[]
  isLoadingMore: boolean
  page: number
}
type Actions = 'setSearchTerm' | 'setRows' | 'updateRows' | 'handleLoadMore' | 'setPage' | 'incPage'

const initialState: TState = { searchTerm: 'a', rows: [], isLoadingMore: false, page: 1 }

const reducer = (config: Config) => (state: TState, action: { type: Actions; payload?: any }) =>
  ({
    setSearchTerm: () => ({ ...state, searchTerm: action.payload, rows: [], page: state.page + 1 }),
    setRows: () => ({ ...state, rows: action.payload }),
    updateRows: () => ({ ...state, rows: calcRows(action.payload, state.rows, config) }),
    handleLoadMore: () => ({ ...state, isLoadingMore: action.payload }),
    setPage: () => ({ ...state, page: action.payload }),
    incPage: () => ({ ...state, page: state.page + 1 }),
  }[action.type]?.() ?? state)

type SS = { isLoading: boolean; config: Config } & TState

const useGalleryState: (
  config: Config
) => [
  SS,
  Dispatch<{
    type: Actions
    payload?: any
  }>
] = (config) => {
  const [state, dispatch] = useReducer(reducer(config), initialState)
  const throttledIsLoadingMore = useThrottle(state.isLoadingMore, 1000)

  const { status, data } = useQuery(['gallery', config, state.searchTerm, state.page], fetchGallery, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 0,
    onSuccess(results: Source[]) {
      dispatch({ type: 'updateRows', payload: results })
    },
  })
  useEffect(() => {
    if (state.isLoadingMore && status !== 'loading' && data?.length > 0) {
      dispatch({ type: 'incPage' })
    }
  }, [state.isLoadingMore, data, status])

  console.log('page', state.page)
  console.log('rendering state', 'status', status)
  const s: SS = {
    isLoading: status === 'loading' || throttledIsLoadingMore || state.isLoadingMore,
    ...state,
    config,
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
