import clsx from 'clsx';
import * as React from 'react';
import type { Accept, DropzoneOptions, FileRejection } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';
import type { FileWithPreview } from '@/types/dropzone';
import { Typography } from '@/components/typography';
import { FilePreview } from '@/components/file-preview';

export type DropzoneInputProps = {
  accept?: Accept;
  helperText?: string;
  id: string;
  label: string | null;
  maxFiles?: number;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: Record<string, unknown>;
  containerClassName?: string;
  defaultValue?: FileWithPreview | FileWithPreview[];
} & Partial<DropzoneOptions>;

const DEFAULT_MIN_SIZE = 100_000;
const DEFAULT_MAX_SIZE = 400_000;

const DropzoneInput = ({
  accept,
  helperText = '',
  id,
  label,
  maxFiles = 1,
  validation,
  readOnly,
  hideError = false,
  containerClassName,
  defaultValue,
  ...dropzoneOptions
}: DropzoneInputProps) => {
  const {
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const error = errors[id] || null;
  const withLabel = label !== null;

  //#region  //*=========== Error Focus ===========
  const dropzoneRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    error && dropzoneRef.current?.focus();
  }, [error]);
  //#endregion  //*======== Error Focus ===========

  //#region  //*=========== Sync Files With RHF ===========
  const fileValue = getValues(id);
  const [files, setFiles] = React.useState<FileWithPreview[]>(fileValue || []);

  React.useEffect(() => {
    setFiles(fileValue || []);
  }, [fileValue]);
  //#endregion  //*======== Sync Files With RHF ===========

  const onDrop = React.useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, files ? [...files] : null);
        setValue(id, files ? [...files] : null);

        let message = rejectedFiles?.[0].errors[0].message;
        if (rejectedFiles[0].errors[0].code === 'file-too-large') {
          message = `File terlalu besar, maksimal ${
            (dropzoneOptions.maxSize || DEFAULT_MAX_SIZE) / 1000
          }KB`;
        } else if (rejectedFiles[0].errors[0].code === 'file-too-small') {
          message = `File terlalu kecil, minimal ${
            (dropzoneOptions.minSize || DEFAULT_MIN_SIZE) / 1000
          }KB`;
        } else if (rejectedFiles[0].errors[0].code === 'too-many-files') {
          message = `Maksimal ${maxFiles} file`;
        } else if (rejectedFiles[0].errors[0].code === 'file-invalid-type') {
          message = message.replace(
            'File type must be',
            'Ekstensi file yang diperbolehkan adalah',
          );
        }

        setError(id, {
          type: 'manual',
          message,
        });
      } else {
        const acceptedFilesPreview = acceptedFiles.map((file: T) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );

        setFiles(
          files
            ? [...files, ...acceptedFilesPreview].slice(0, maxFiles)
            : acceptedFilesPreview,
        );

        setValue(
          id,
          files
            ? [...files, ...acceptedFiles].slice(0, maxFiles)
            : acceptedFiles,
          {
            shouldValidate: true,
          },
        );
        clearErrors(id);
      }
    },
    [
      clearErrors,
      dropzoneOptions.maxSize,
      dropzoneOptions.minSize,
      files,
      id,
      maxFiles,
      setError,
      setValue,
    ],
  );

  React.useEffect(() => {
    return () => {
      () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
    };
  }, [files]);

  const deleteFile = (
    e: React.MouseEvent<HTMLButtonElement>,
    file: FileWithPreview,
  ) => {
    e.preventDefault();
    const newFiles = [...files];

    newFiles.splice(newFiles.indexOf(file), 1);

    if (newFiles.length > 0) {
      setFiles(newFiles);
      setValue(id, newFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      setFiles([]);
      setValue(id, null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    // 5KB
    minSize: dropzoneOptions.minSize || DEFAULT_MIN_SIZE,
    // 400KB
    maxSize: dropzoneOptions.maxSize || DEFAULT_MAX_SIZE,
    ...dropzoneOptions,
  });

  return (
    <div className={containerClassName}>
      {withLabel ? (
        <Typography as='label' className='block' htmlFor={id} variant='s3'>
          {label}
        </Typography>
      ) : null}

      {readOnly && !(files.length > 0) ? (
        <div className='mt-1 divide-y divide-gray-300 rounded-lg border border-gray-300 py-3 pl-3 pr-4 text-sm'>
          Tidak ada file yang diupload
        </div>
      ) : files.length >= maxFiles ? (
        <ul
          className={clsx([
            'divide-y divide-gray-300 rounded-lg border border-gray-300',
            withLabel && 'mt-1',
          ])}
        >
          {files.map((file, index) => (
            <FilePreview
              deleteFile={deleteFile}
              file={file}
              key={index}
              readOnly={readOnly}
            />
          ))}
        </ul>
      ) : (
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={id}
          render={({ field }) => (
            <>
              <div
                className={clsx([
                  'focus:ring-dark-400 group focus:outline-none',
                  withLabel && 'mt-1',
                ])}
                {...getRootProps()}
                ref={dropzoneRef}
              >
                <input {...field} {...getInputProps()} />
                <div
                  className={clsx(
                    'w-full cursor-pointer rounded-lg px-2 py-8',
                    error
                      ? 'dropzone-border-dash-error border-red-500 group-focus:border-red-500'
                      : 'dropzone-border-dash group-focus:border-primary-500',
                  )}
                >
                  <div className='space-y-1 text-center'>
                    <svg
                      aria-hidden='true'
                      className='mx-auto h-12 w-12 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 48 48'
                    >
                      <path
                        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                      />
                    </svg>
                    <p className='text-gray-500'>
                      Klik untuk upload, atau drag file ke sini
                    </p>
                    <p className='text-xs text-gray-500'>{`${
                      maxFiles - (files.length || 0)
                    } file lagi`}</p>
                  </div>
                </div>
              </div>

              {helperText ? (
                <Typography className='mt-1' color='secondary' variant='c1'>
                  {helperText}
                </Typography>
              ) : null}
              {!hideError && error ? (
                <Typography className='mt-1' color='danger' variant='c1'>
                  {error.message?.toString()}
                </Typography>
              ) : null}
              {!readOnly && Boolean(files.length) && (
                <ul className='mt-1 divide-y divide-gray-300 rounded-lg border border-gray-300'>
                  {files.map((file, index) => (
                    <FilePreview
                      deleteFile={deleteFile}
                      file={file}
                      key={index}
                      readOnly={readOnly}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
          rules={validation}
        />
      )}
    </div>
  );
};
DropzoneInput.displayName = 'DropzoneInput';

export { DropzoneInput };
