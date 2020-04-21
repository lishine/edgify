import { Source, TRow } from '../../types'
import { appendRowsMasonry } from './appendRowsMasonry'

test('test appendRowsMasonry', async () => {
    let rows: TRow[] = []
    const N_COLS = 2
    const sources: Source[] = [
        { height: 20, id: '', width: 150, url: '' },
        { height: 10, id: '', width: 150, url: '' },
        { height: 30, id: '', width: 150, url: '' },
        { height: 10, id: '', width: 150, url: '' },
        { height: 30, id: '', width: 150, url: '' },
        { height: 20, id: '', width: 150, url: '' },
    ]
    rows = appendRowsMasonry(sources, rows, N_COLS)
    expect(rows).toHaveLength(sources.length / N_COLS)
    expect(rows[0].cols).toHaveLength(N_COLS)
    console.log('calcRows(sources)', JSON.stringify(rows, null, 2))
})
