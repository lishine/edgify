import React, { FC } from 'react'
import { useContextSelector, createContext as UCScreateContext } from 'use-context-selector'

type State = {}

const useStateFactory = <T1, T2>(Context: React.Context<[T1, T2]>) => <N extends unknown>(fn: (t: [T1, T2]) => N) =>
  useContextSelector<[T1, T2], N>(Context, fn) // eslint-disable-line

export const createContext = <T1, T2, I>(useCreateState: (props: I) => [T1, T2]) => {
  const Context = UCScreateContext([{}, {}] as [T1, T2])
         const useContext = useStateFactory(Context) // eslint-disable-line

  const Provider: FC<{ init: I }> = ({ children, init }) => {
    const state = useCreateState(init)
    return <Context.Provider value={state}>{children}</Context.Provider>
  }

  return { Provider, useContext, Context }
}
