import { useEffect, DependencyList } from 'react'
import { useTimeoutFn } from 'react-use'

type UseDebounceReturn = [() => boolean | null, () => void]
export function useDebounceWhen(fn: Function, when: Function, ms = 0, deps: DependencyList = []): UseDebounceReturn {
    const [isReady, cancel, reset] = useTimeoutFn(fn, ms)

    useEffect(() => {
        if (when(...deps)) {
            cancel()
            fn()
        } else {
            reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return [isReady, cancel]
}
