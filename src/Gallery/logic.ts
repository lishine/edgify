import { useEffect, useCallback } from 'react'
import wretch from 'wretch'
import { useUpdateEffect } from 'react-use'
import { createContext } from '../lib/contextStore'

import { Config } from './types'
import { useReducer } from '../utils/useReducer'
import { useDebounceWhen } from '../utils/useDebounceWhen'
import { useInfiniteQuery } from '../utils/useInfiniteQuery'
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

const useGalleryState = (config: Config) => {
    const [state, dispatch] = useReducer(
        (state, payload) => ({
            setLoading: () => ({ ...state, isLoading: payload }),
            setSearchTerm: () => ({ ...state, searchTerm: payload }),
        }),
        { isLoading: false, searchTerm: 'b' },
        'gallery'
    )

    const { status, data, fetchMore } = useInfiniteQuery(
        state.searchTerm && ['gallery', state.searchTerm, config],
        fetchGallery
    )
    const { rows, reset } = useTransformList(config, data)

    useUpdateEffect(() => {
        reset()
    }, [state.searchTerm])

    useDebounceWhen(
        () => dispatch({ type: 'setLoading', payload: status === 'loading' }),
        ([status]: [string]) => status === 'loading',
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
