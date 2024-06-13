import type { ColumnDef, SortingState } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { List } from 'lucide-react';
import * as React from 'react';
import cn from '@/lib/classnames';
import { Option } from '@/components/table/option';
import { TableHead } from '@/components/table/table-head';
import { TableBody } from '@/components/table/table-body';
import { PaginationControl } from '@/components/table/pagination-control';
import { Typography } from '@/components/typography';
import { Filter } from '@/components/table/filter';

export type PaginatedTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  emptyPlaceholder?: React.ReactNode;
  filterPlaceholder?: string;
  isLoading?: boolean;
  pageSize?: number;
  omitSort?: boolean;
  withFilter?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const PaginatedTable = <T extends object>({
  className,
  columns,
  data,
  emptyPlaceholder,
  filterPlaceholder,
  isLoading = false,
  pageSize = 10,
  omitSort = false,
  withFilter = false,
  ...rest
}: PaginatedTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize,
      },
    },
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    /** @see https://github.com/TanStack/table/issues/4280 */
    globalFilterFn: (row, columnId, filterValue) => {
      const safeValue = (() => {
        const value = row.getValue(columnId) as string | number;
        return typeof value === 'number' ? String(value) : value;
      })();

      return safeValue?.toLowerCase().includes(filterValue.toLowerCase());
    },
  });

  const metaFrom =
    table.getState().pagination.pageIndex *
      table.getState().pagination.pageSize +
    1;
  const metaTotal = data.length;
  const _metaTo =
    table.getState().pagination.pageIndex *
      table.getState().pagination.pageSize +
    table.getState().pagination.pageSize;
  const metaTo = _metaTo > metaTotal ? metaTotal : _metaTo;

  return (
    <div className={cn('flex flex-col', className)} {...rest}>
      <div
        className={cn(
          'flex flex-col items-stretch gap-3 sm:flex-row',
          withFilter ? 'sm:justify-between' : 'sm:justify-end',
        )}
      >
        {withFilter ? (
          <Filter placeholder={filterPlaceholder} table={table} />
        ) : null}
        <div className='flex gap-3'>
          <Option
            icon={<List className='text-typo-secondary' size={16} />}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            value={table.getState().pagination.pageSize}
          >
            {[5, 10, 25].map((page) => (
              <option key={page} value={page}>
                {page} Entries
              </option>
            ))}
          </Option>
        </div>
      </div>
      <div className='-my-2 -mx-4 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
          <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-300'>
              <TableHead omitSort={omitSort} table={table} />
              <TableBody
                emptyPlaceholder={emptyPlaceholder}
                isLoading={isLoading}
                omitSort={omitSort}
                table={table}
              />
            </table>
          </div>
        </div>
      </div>

      <Typography className='mt-2 md:text-right' color='tertiary' variant='b3'>
        Menampilkan urutan{' '}
        <span className='font-medium text-typo'>
          {metaFrom.toLocaleString()}
        </span>{' '}
        sampai{' '}
        <span className='font-medium text-typo'>{metaTo.toLocaleString()}</span>{' '}
        dari{' '}
        <span className='font-medium text-typo'>
          {metaTotal.toLocaleString()}
        </span>{' '}
        data
      </Typography>
      <PaginationControl className='mt-4' data={data} table={table} />
    </div>
  );
};
PaginatedTable.displayName = 'PaginatedTable';

export { PaginatedTable };
