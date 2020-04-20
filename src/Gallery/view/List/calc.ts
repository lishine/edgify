import { Source, TRow, Tcol } from '../../types'

// purpose - to arrange items in columns and translate them up or down according to the previous items
export const appendRowsMasonry = (sources: Source[], existingRows: TRow[] = [], nCols: number) => {
    let elements: Source[] = []
    const rows = [...existingRows]
    const startRowLength = rows.length
    sources?.forEach((r, sourceIndex) => {
        elements.push(r)
        if (sourceIndex % nCols === nCols - 1) {
            const rowIndex = startRowLength + Math.floor(sourceIndex / nCols)
            // previous accumulated heights
            const prevAccHeights =
                rowIndex === 0 ? Array(nCols).fill(0) : rows[rowIndex - 1].cols.map((c) => c.accHeight)
            const maxPrevAccHeight = rowIndex === 0 ? 0 : Math.max(...rows[rowIndex - 1].cols.map((c) => c.accHeight))

            // Position items in columns
            // sort prevAccHeights contra to elements' heights
            // thus short item will go where the hieghest height
            const _prevAccHeights = [...prevAccHeights.map((height, index) => ({ height, index }))]
            _prevAccHeights.sort((a, b) => (a.height < b.height ? -1 : a.height > b.height ? 1 : 0))
            elements.sort((a, b) => (a.height < b.height ? -1 : a.height > b.height ? 1 : 0)).reverse()
            const sortedIndexes = _prevAccHeights.map(({ index }) => index)

            const cols: Tcol[] = []
            elements.forEach((el, elIndex) => {
                const colIndex = sortedIndexes[elIndex]
                const { height } = el
                const prevAccHeight = prevAccHeights[colIndex]
                const accHeight = height + prevAccHeight
                const margin = prevAccHeight - maxPrevAccHeight
                cols[colIndex] = {
                    ...el,
                    offset: Math.floor(margin),
                    accHeight,
                    height: Math.floor(height),
                }
            })

            // Calc row height
            const maxAccHeight = Math.max(...cols.map((c) => c.accHeight))
            const height = Math.floor(maxAccHeight - maxPrevAccHeight)

            rows.push({ height, cols })
            elements = []
        }
    })
    console.log('000rows', rows)
    return rows
}
