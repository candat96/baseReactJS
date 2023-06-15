import type { ColumnDef, RowData } from '@tanstack/react-table';
export type IProColumn<D, V = any> = ColumnDef<D, V>[];

export interface IProPaginationProps {
  total: number;
  pageSize: number;
  rowsPerPageOptions?: string[];
  setPage: (page: number) => void;
}

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue = unknown> {
    title?: string;
    info?: string;
    align?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
    type?: 'text' | 'date' | 'select' | 'img';
    editable?: boolean | ((row: TData) => boolean);
    hidden?: boolean | ((row: TData) => boolean);
    required?: boolean;
  }
}
