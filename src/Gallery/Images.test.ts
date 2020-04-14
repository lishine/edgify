import { calcRows } from './Images'

test('test calcRows', async () => {
  const sources = [
    { height: 20, id: '', width: 150, urls: { raw: '' } },
    { height: 10, id: '', width: 150, urls: { raw: '' } },
    { height: 30, id: '', width: 150, urls: { raw: '' } },
    { height: 10, id: '', width: 150, urls: { raw: '' } },
    { height: 30, id: '', width: 150, urls: { raw: '' } },
    { height: 20, id: '', width: 150, urls: { raw: '' } },
  ]
  console.log('calcRows(sources)', JSON.stringify(calcRows(sources), null, 2))
})
