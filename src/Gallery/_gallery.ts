import { useState } from 'react'
import wretch from 'wretch'
import { useQuery } from 'react-query'

import { createContext } from '../lib/contextStore'

const fetch = (searchTerm: string) =>
  wretch(
    `https://api.unsplash.com/search/photos?client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b&per_page=30&query=${searchTerm}`
  )
    .get()
    .setTimeout(1000)
    .json()

const useGalleryState = () => {
  const [searchTerm, setSearchTerm] = useState('a')
  const { status, data } = useQuery([searchTerm], fetch)

  console.log('state')
  return {
    isLoading: status === 'loading',
    data,
    searchTerm,
    setSearchTerm,
  }
}

export const { Provider, useContext: useGalleryContext } = createContext(useGalleryState)
