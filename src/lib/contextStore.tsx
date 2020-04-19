import React, { FC } from 'react'
import { useContextSelector, createContext as UCScreateContext } from 'use-context-selector'

const useStateFactory = <T extends unknown>(Context: React.Context<T>) => <N extends unknown>(fn: (t: T) => N) =>
  useContextSelector<T, N>(Context, fn) // eslint-disable-line

export const createContext = <T, I>(useCreateState: (props: I) => T) => {
  const Context = UCScreateContext({} as T)
         const useContext = useStateFactory(Context) // eslint-disable-line

  const Provider: FC<{ init: I }> = ({ children, init }) => {
    const state = useCreateState(init)
    return <Context.Provider value={state}>{children}</Context.Provider>
  }

  return { Provider, useContext, Context }
}
