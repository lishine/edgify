import { calcRows, Source, TRow } from './calc'

test('test calcRows', async () => {
  let rows: TRow[] = []
  const imageWidth = 250
  const N_COLS = 2
  const sources: Source[] = [
    { height: 20, id: '', width: 150, urls: { raw: '' } },
    { height: 10, id: '', width: 150, urls: { raw: '' } },
    { height: 30, id: '', width: 150, urls: { raw: '' } },
    { height: 10, id: '', width: 150, urls: { raw: '' } },
    { height: 30, id: '', width: 150, urls: { raw: '' } },
    { height: 20, id: '', width: 150, urls: { raw: '' } },
  ]
  rows = calcRows(sources, rows, N_COLS, imageWidth)
  expect(rows).toHaveLength(sources.length / N_COLS)
  expect(rows[0].cols).toHaveLength(N_COLS)
  console.log('calcRows(sources)', JSON.stringify(rows, null, 2))
})
