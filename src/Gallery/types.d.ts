export interface Source {
    id: string | number
    height: number
    width: number
    url: string
    [key: string]: any
}

export interface Tcol {
    offset: number
    accHeight: number
    height: number
    url: string
    id: string | number
}

export interface TRow {
    cols: Tcol[]
    height: number
}

export interface Config {
    imageWidth: number
    height: number
    nCols: number
    gapX: number
    gapY: number
    perPage: number
    url: string
    overscanCount: number
    threshold: number
}
