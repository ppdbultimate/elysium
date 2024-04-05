import { Button } from '@ppdbultimate/elysium';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import ExampleAdaptiveModal from '@/pages/sandbox/components/ExampleAdaptiveModal';
import ExampleModal from '@/pages/sandbox/components/ExampleModal';

export default function ModalPage() {
  return (
    <Layout>
      <Seo templateTitle='Modal' />

      <main>
        <section className=''>
          <div className='layout min-h-screen space-x-2 py-20'>
            <ExampleModal>
              {({ openModal }) => (
                <Button onClick={openModal}>Open Modal</Button>
              )}
            </ExampleModal>
            <ExampleAdaptiveModal>
              {({ openModal }) => (
                <Button onClick={openModal}>Open Adaptive Modal</Button>
              )}
            </ExampleAdaptiveModal>
          </div>
        </section>
      </main>
    </Layout>
  );
}
