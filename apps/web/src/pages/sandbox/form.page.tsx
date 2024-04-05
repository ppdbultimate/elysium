import {
  Button,
  Checkbox,
  DatePicker,
  DropzoneInput,
  FormProvider,
  Input,
  PasswordInput,
  Radio,
  Select,
  Textarea,
  Typography,
  useForm,
} from '@ppdbultimate/elysium';
import { Search, XCircle } from 'lucide-react';
import * as React from 'react';

import logger from '@/lib/logger';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

/**
 * This is typed incorrectly for the sake of sandbox purpose
 * If you need a boilerplate for a new RHF page,
 * please take a reference for React Hook Form Layout on
 * @see /components/forms/boilerplate.tsx
 */

export default function FormSandbox() {
  const methods = useForm({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: unknown) => {
    logger({ data }, 'rhf.tsx line 33');

    // !STARTERCONF Remove console log, use logger instead
    // eslint-disable-next-line no-console
    console.log({ data });
    return;
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <Layout>
      <Seo templateTitle='Form Sandbox' />

      <section className=''>
        <div className='layout min-h-screen py-20'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='max-w-sm space-y-3'
            >
              <Input
                id='name'
                label='Name'
                validation={{ required: 'Name must be filled' }}
                placeholder='Enter your name'
                helperText='This is a helper text'
              />
              <Input
                id='search'
                label='Search'
                placeholder='Search something...'
                validation={{ required: 'Search must be filled' }}
                helperText='This is a helper text'
                leftIcon={Search}
                rightNode={
                  <button type='button' className='p-1'>
                    <XCircle size={18} className='text-typo-icons' />
                  </button>
                }
              />
              <Select
                id='selectinput'
                label='Select Input'
                placeholder='Select something'
                options={[
                  { value: 'hi', label: 'hi' },
                  {
                    label: 'option 2',
                    value: 'option2',
                  },
                ]}
                validation={{ required: 'Select Input must be filled' }}
              />
              <Input
                id='price'
                label='Price'
                validation={{ required: 'Price must be filled' }}
                placeholder='Enter your price'
                helperText='This is a helper text'
                leftIcon='Rp'
              />
              <PasswordInput
                id='password'
                label='Password'
                validation={{ required: 'Password must be filled' }}
                placeholder='Enter your password'
              />
              <DropzoneInput
                id='photo'
                label='Activity Photo'
                validation={{ required: 'Photo must be filled' }}
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                helperText='You can upload file with .png, .jpg, atau .jpeg extension.'
                minSize={5000}
              />
              <DatePicker
                id='date'
                label='Date'
                validation={{
                  required: 'Date must be filled',
                  valueAsDate: true,
                }}
                placeholder='dd/mm/yyyy'
              />

              <div className='space-y-2'>
                <Typography variant='s2'>Select These Fruit</Typography>
                <Checkbox
                  name='fruits'
                  label='Apple'
                  value='apple'
                  // hideError on every checkbox except the last one, or use ErrorMessage
                  hideError
                />
                <Checkbox
                  name='fruits'
                  label='Strawberry'
                  value='strawberry'
                  // hideError on every checkbox except the last one, or use ErrorMessage
                  hideError
                />
                <Checkbox
                  name='fruits'
                  label='Orange'
                  value='orange'
                  // validation only on the last element, or you can use <ErrorMessage />
                  validation={{ required: 'Fruits must be checked' }}
                />
              </div>

              <div className='space-y-2'>
                <Typography variant='s2'>Language</Typography>
                <Radio
                  name='language'
                  label='CSS'
                  value='css'
                  // hideError on every radio except the last one, or use ErrorMessage
                  hideError
                />
                <Radio
                  name='language'
                  label='JavaScript'
                  value='javascript'
                  // validation only on the last element, or you can use <ErrorMessage />
                  validation={{ required: 'Language must be filled' }}
                />
              </div>

              <Textarea
                id='address'
                label='Address'
                validation={{ required: 'Address must be filled' }}
              />
              <div className='flex flex-wrap gap-4'>
                <Button variant='outline'>Not Submit</Button>
                <Button type='submit'>Submit</Button>
              </div>
              <p className='text-sm text-gray-800'>
                Check console after submit
              </p>
            </form>
          </FormProvider>
        </div>
      </section>
    </Layout>
  );
}
