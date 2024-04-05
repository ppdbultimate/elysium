import { Button } from '@ppdbultimate/elysium';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import ExampleDrawer from '@/pages/sandbox/components/ExampleDrawer';

export default function DrawerPage() {
  return (
    <Layout>
      <Seo templateTitle='Drawer' />

      <main>
        <section className='space-x-4 layout min-h-screen py-20'>
          <ExampleDrawer>
            {({ openDrawer }) => (
              <Button onClick={openDrawer}>Open Drawer</Button>
            )}
          </ExampleDrawer>
        </section>
      </main>
    </Layout>
  );
}
