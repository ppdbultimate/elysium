import { Select, SelectProps } from '@ppdbultimate/elysium';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import get from 'lodash.get';
import * as React from 'react';

import { ApiError, ApiResponse } from '@/types/api';

type ServerSelectInputProps = {
  route: string;
  valueGetter?: string;
  labelGetter?: string;
  enabled?: boolean;
} & Omit<SelectProps, 'options'>;

export default function ServerSelectInput({
  route,
  valueGetter = 'id',
  labelGetter = 'name',
  enabled,
  ...rest
}: ServerSelectInputProps) {
  //#region  //*=========== Get Options ===========
  const { data: optionsData, isLoading } = useQuery<
    ApiResponse<Array<object>>,
    AxiosError<ApiError>
  >([route], {
    refetchOnWindowFocus: false,
    enabled,
  });
  const options =
    optionsData?.data?.map((item) => ({
      value: get(item, valueGetter) + '',
      label: get(item, labelGetter) + '',
    })) || [];
  //#endregion  //*======== Get Options ===========

  return (
    <Select
      options={options}
      noOptionsMessage={() =>
        isLoading ? 'Mengambil data...' : 'Data tidak ditemukan'
      }
      {...rest}
    />
  );
}
