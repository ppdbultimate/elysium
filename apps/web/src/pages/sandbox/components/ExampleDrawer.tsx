import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerSection,
  DrawerTitle,
  FormProvider,
  Input,
  Typography,
  useForm,
} from '@ppdbultimate/elysium';
import * as React from 'react';

import logger from '@/lib/logger';

type DrawerReturnType = {
  openDrawer: () => void;
};

export default function ExampleDrawer({
  children,
}: {
  children: (props: DrawerReturnType) => JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const drawerReturn: DrawerReturnType = {
    openDrawer: () => setOpen(true),
  };

  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: 'Dumy',
      email: 'Dummy@gmail.com',
    },
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: unknown) => {
    logger({ data }, 'rhf.tsx line 26');
    setOpen(false);

    return;
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <>
      {children(drawerReturn)}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>
              Drawer Description, Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Minima, odio.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerSection className='flex flex-col gap-4'>
            <FormProvider {...methods}>
              <form id='form' onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h5'>Drawer Section</Typography>
                <div className='flex flex-col gap-2'>
                  <Input id='name' label='Name' />
                  <Input id='email' label='Email' type='email' />
                </div>
              </form>
            </FormProvider>
          </DrawerSection>
          <DrawerFooter>
            <Button form='form' type='submit'>
              Confirm
            </Button>
            <DrawerClose asChild>
              <Button variant='outline'>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
