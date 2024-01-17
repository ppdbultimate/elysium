import type { PaginationState, SortingState } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import * as React from 'react';

export type UseServerTableProps<T extends object> = {
  pageSize?: number;
  sort?: {
    key: Extract<keyof T, string>;
    type: 'asc' | 'desc';
  };
};

const useServerTable = <T extends object>({
  pageSize = 10,
  sort,
}: UseServerTableProps<T> = {}) => {
  const router = useRouter();
  const query = router.query;

  const defaultState = {
    globalFilter: '',
    pageIndex: 0,
    pageSize,
    sorting: sort
      ? [
          {
            id: sort.key,
            desc: sort.type === 'desc',
          },
        ]
      : [],
  };

  const [globalFilter, setGlobalFilter] = React.useState(
    query.filter ? String(query.filter) : defaultState.globalFilter,
  );
  const [sorting, setSorting] = React.useState<SortingState>(
    query.sort ? JSON.parse(query.sort as string) : defaultState.sorting,
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: query.page ? Number(query.page) - 1 : defaultState.pageIndex,
    pageSize: query.size ? Number(query.size) : defaultState.pageSize,
  });

  /** Sync URL based on table states */
  React.useEffect(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...query,
          page: pagination.pageIndex + 1,
          size: pagination.pageSize,
          filter: globalFilter === '' ? undefined : globalFilter,
          sort: JSON.stringify(sorting),
        },
      },
      undefined,
      { shallow: true },
    );
    // Ignore query and router to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, globalFilter, sorting]);

  // Reset pagination when global filter changes
  React.useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [globalFilter]);

  return {
    tableState: {
      globalFilter,
      pagination,
      sorting,
    },
    setTableState: {
      setGlobalFilter,
      setPagination,
      setSorting,
    },
  };
};

export { useServerTable };
