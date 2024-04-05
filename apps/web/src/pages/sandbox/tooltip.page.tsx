import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Typography,
} from '@ppdbultimate/elysium';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function TooltipPage() {
  return (
    <Layout>
      <Seo templateTitle='Tooltip' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <Typography as='h1' variant='h1'>
              Tooltip
            </Typography>

            <div className='mt-8'>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button>Hover me!</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Typography variant='b2'>Hover content</Typography>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className='mt-8'>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Typography variant='b2' className='inline-block'>
                      Hover me again, but from typography component
                    </Typography>
                  </TooltipTrigger>
                  <TooltipContent side='bottom'>
                    <Typography variant='b2'>Hover content</Typography>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
