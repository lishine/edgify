import { useEffect, DependencyList } from 'react'
import { useReducer as _useReducer } from 'reinspect'
import { useTimeoutFn } from 'react-use'

type UseDebounceReturn = [() => boolean | null, () => void]
export default function useDebounceWhen(
  fn: Function,
  when: Function,
  ms = 0,
  deps: DependencyList = []
): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms)

  useEffect(() => {
    if (when(deps)) {
      cancel()
      fn()
    } else {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return [isReady, cancel]
}

export const findMin = (fn: (n: number) => number) => (ar: number[]) =>
  ar.reduce(
    (acc: { min: number; index: number }, v: number, _i) => (acc.min < fn(v) ? acc : { min: fn(v), index: _i }),
    {
      min: 0,
      index: 0,
    }
  )

type Actions<S, T extends string> = (state: S, payload: any, initialState: S) => Record<T, () => S>

const createReducer = <S, T extends string>(actions: Actions<S, T>, initialState: S) => (
  state: S,
  action: { type: T; payload?: any }
) => actions(state, action.payload, initialState)[action.type]?.() ?? state

export const useReducer = <S, T extends string>(
  actions: Actions<S, T>,
  initialState: S,
  init?: string | ((s: any) => S),
  key?: string
) =>
  _useReducer(
    createReducer<S, T>(actions, initialState),
    initialState,
    typeof init === 'function' ? init : (s) => s,
    typeof init === 'string' ? init : key
  )
