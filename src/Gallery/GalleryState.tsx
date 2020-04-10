import React, { useState } from 'react'
import wretch from 'wretch'
import { useQuery } from 'react-query'
import { createContext, useContextSelector } from 'use-context-selector'

const fetch = (searchTerm: string) =>
  wretch(
    `https://api.unsplash.com/search/photos?client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b&per_page=20&query=${searchTerm}`
  )
    .get()
    .setTimeout(1000)
    .json()

const Context = createContext<any>(null)
export const useGalleryState = (fn: (any: any) => any) => useContextSelector(Context, fn)

export const GalleryStateProvider = ({ children }: any) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { status, data } = useQuery([searchTerm], fetch)

  return (
    <Context.Provider
      value={{
        isLoading: status === 'loading',
        data,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </Context.Provider>
  )
}
