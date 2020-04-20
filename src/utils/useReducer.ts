import { useReducer as _useReducer } from 'reinspect'

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
