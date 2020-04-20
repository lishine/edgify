import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import { useFirstMountState } from 'react-use'

export const useDeepCompareUpdateEffectNoCheck: typeof useDeepCompareEffectNoCheck = (effect, deps) => {
    const isFirstMount = useFirstMountState()

    useDeepCompareEffectNoCheck(() => {
        if (!isFirstMount) {
            return effect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}
