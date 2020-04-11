import React, { FC } from 'react'
import { useContextSelector, createContext as UCScreateContext } from 'use-context-selector'

function useStateFactory<T>(Context: React.Context<T>) {
  return function<S>(fn: (s: T) => S) {
    return useContextSelector(Context, fn) // eslint-disable-line
  }
}
export function createContext<T>(useCreateState: () => T) {
  const Context = UCScreateContext({} as T)
  const useContext = useStateFactory(Context) // eslint-disable-line

  const Provider: FC = ({ children }) => {
    const state = useCreateState()
    return <Context.Provider value={state}>{children}</Context.Provider>
  }

  return { Provider, useContext, Context }
}
