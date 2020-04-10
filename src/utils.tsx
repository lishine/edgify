import React, { FC } from 'react'
import { useContextSelector, createSelectorProvider } from 'react-use-context-selector'

function useStateFactory<T>(Context: React.Context<T>) {
  return function<S>(fn: (s: T) => S) {
    return useContextSelector(Context, fn)
  }
}
export function createContext<T>(useCreateState: () => T) {
  const Context = React.createContext({} as T)
  const SelectorProvider = createSelectorProvider(Context)
  const useContext = useStateFactory(Context)

  const Provider: FC = ({ children }) => {
    const state = useCreateState()
    return <SelectorProvider value={state}>{children}</SelectorProvider>
  }

  return { Provider, useContext, Context }
}
