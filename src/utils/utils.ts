export const findMin = (fn: (n: number) => number) => (ar: number[]) =>
    ar.reduce(
        (acc: { min: number; index: number }, v: number, _i) => (acc.min < fn(v) ? acc : { min: fn(v), index: _i }),
        {
            min: 0,
            index: 0,
        }
    )
