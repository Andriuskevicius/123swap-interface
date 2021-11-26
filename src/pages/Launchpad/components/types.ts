export type TableProps = {
  data?: TableDataTypes[]
  selectedFilters?: string
  sortBy?: string
  sortDir?: string
  onSort?: (value: string) => void
}

export type ColumnsDefTypes = {
  id: number
  label: string
  name: string
  translationId: number
  sortable: boolean
}

export type ScrollBarProps = {
  ref: string
  width: number
}

export type TableDataTypes = {
  POOL: string
  APY: string
  EARNED: string
  STAKED: string
  DETAILS: string
  LINKS: string
}

export const MobileColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'name',
    translationId: 999,
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'price',
    translationId: 1072,
    sortable: true,
    label: 'Price',
  },
  {
    id: 6,
    name: 'details',
    translationId: 999,
    sortable: true,
    label: '',
  },
]

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'name',
    translationId: 999,
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'start_date',
    translationId: 1072,
    sortable: true,
    label: 'Start date',
  },
  {
    id: 3,
    name: 'end_date',
    translationId: 736,
    sortable: true,
    label: 'End date',
  },
  {
    id: 4,
    name: 'price',
    translationId: 999,
    sortable: true,
    label: 'Price',
  },
  {
    id: 5,
    name: 'max',
    translationId: 999,
    sortable: true,
    label: 'Max',
  },
  {
    id: 6,
    name: 'details',
    translationId: 999,
    sortable: true,
    label: '',
  },
]

export enum ViewMode {
  'TABLE' = 'TABLE',
  'CARD' = 'CARD',
}
