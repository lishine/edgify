import React, { FC } from 'react'
import { useContextSelector, createContext as UCScreateContext } from 'use-context-selector'

const useStateFactory = <T extends unknown>(Context: React.Context<T>) => <S extends unknown>(fn: (s: T) => S) =>
  useContextSelector(Context, fn) // eslint-disable-line

export const createContext = <T extends unknown>(useCreateState: () => T) => {
  const Context = UCScreateContext({} as T)
         const useContext = useStateFactory(Context) // eslint-disable-line

  const Provider: FC = ({ children }) => {
    const state = useCreateState()
    return <Context.Provider value={state}>{children}</Context.Provider>
  }

  return { Provider, useContext, Context }
}
