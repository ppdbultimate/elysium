import type {
  ColumnDef,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';
import * as React from 'react';
import { Filter } from '@/components/table/filter';
import { Option } from '@/components/table/option';
import { TableBody } from '@/components/table/table-body';
import { TableHead } from '@/components/table/table-head';
import cn from '@/lib/classnames';
import { Typography } from '@/components/typography';
import { Button } from '@/components/button';
import { LOCALE } from '@/constant/common';

interface PaginatedApiResponse<T> {
  code: number;
  status: string;
  data: T;
  links: {
    first: string;
    last: null;
    prev?: string;
    next?: string;
  };
  meta: {
    current_page: number;
    per_page: number;
    from?: number;
    to?: number;
  };
}

export interface ServerTableState {
  globalFilter: string;
  pagination: PaginationState;
  sorting: SortingState;
}

export interface ServerTableMeta {
  last_page: number;
  total: number;
  from?: number;
  to?: number;
}

interface SetServerTableState {
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

export type ServerTableProps<T extends object> = {
  columns: ColumnDef<T>[];
  data: PaginatedApiResponse<T[]> | undefined;
  emptyPlaceholder?: React.ReactNode;
  filterPlaceholder?: string;
  header?: React.ReactNode;
  isLoading: boolean;
  tableState: ServerTableState;
  setTableState: SetServerTableState;
  omitSort?: boolean;
  withFilter?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const ServerTable = <T extends object>({
  className,
  columns,
  data: response,
  header: Header,
  isLoading,
  tableState,
  setTableState,
  emptyPlaceholder,
  filterPlaceholder,
  omitSort = false,
  withFilter = false,
  ...rest
}: ServerTableProps<T>) => {
  const data = response?.data || [];
  const meta = response?.meta;
  const links = response?.links;

  const table = useReactTable({
    data,
    columns,
    state: {
      ...tableState,
    },
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    onGlobalFilterChange: setTableState.setGlobalFilter,
    onPaginationChange: setTableState.setPagination,
    onSortingChange: setTableState.setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <div className={cn('flex flex-col', className)} {...rest}>
      <div
        className={cn(
          'flex flex-col items-stretch gap-3 sm:flex-row',
          withFilter ? 'sm:justify-between' : 'sm:justify-end',
        )}
      >
        {withFilter ? (
          <Filter
            isLoading={isLoading}
            placeholder={filterPlaceholder}
            table={table}
          />
        ) : null}
        <div className='flex items-center gap-3'>
          {Header}
          <Option
            icon={<List size={16} />}
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
      <div
        className={cn([
          'mt-2 overflow-x-auto',

          // to allow table to overflow on right side (desktop) and/or both side (mobile)
          '-mx-[4%] md:-mr-[2.5%]',

          // set enough space so the the drop-shadow is not cropped
          'md:-ml-[2px] md:pl-[2px]',
        ])}
      >
        <div className='inline-block min-w-full py-2 align-middle'>
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

      {(Boolean(meta?.from) || Boolean(meta?.to)) && (
        <Typography
          className='mt-2 md:text-right'
          color='tertiary'
          variant='b3'
        >
          Menampilkan data urutan{' '}
          <span className='font-medium text-typo'>
            {meta?.from?.toLocaleString(LOCALE)}
          </span>{' '}
          sampai{' '}
          <span className='font-medium text-typo'>
            {meta?.to?.toLocaleString(LOCALE)}
          </span>{' '}
        </Typography>
      )}

      <div className='flex items-center justify-between gap-x-2 mt-6 md:justify-end'>
        <div className='flex gap-1'>
          <Button
            disabled={!links?.prev}
            leftIcon={ChevronLeft}
            onClick={() => table.previousPage()}
            size='sm'
            variant='ghost'
          >
            Prev
          </Button>
          <Button
            disabled={
              !links?.next || data.length < table.getState().pagination.pageSize
            }
            onClick={() => table.nextPage()}
            rightIcon={ChevronRight}
            size='sm'
            variant='ghost'
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
ServerTable.displayName = 'ServerTable';

export { ServerTable };
