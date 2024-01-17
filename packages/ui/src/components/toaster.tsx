import { useRouter } from 'next/router';
import * as React from 'react';
import { toast, Toaster as Sonner } from 'sonner';

const Toaster = () => {
  const router = useRouter();
  /**
   * ? This allows to show a toast via query params
   * * toast_type success, error, or none: default
   * * toast_message (required) the message to show
   */

  React.useEffect(() => {
    const toastType = router.query.toast_type;
    const toastMessage = router.query.toast_message;

    if (typeof toastMessage === 'string') {
      if (toastType === 'success') {
        toast.success(toastMessage as string);
      } else if (toastType === 'error') {
        toast.error(toastMessage as string);
      } else {
        toast(toastMessage as string);
      }

      const cleanedQuery = { ...router.query };
      delete cleanedQuery.toast_type;
      delete cleanedQuery.toast_message;

      router.replace({ query: cleanedQuery }, undefined, { shallow: true });
    }
  }, [router, router.query, router.isReady]);

  return (
    <Sonner
      closeButton
      position='top-center'
      richColors
      toastOptions={{
        classNames: {
          actionButton: '!ml-0 !mr-2 !bg-primary-500',
          closeButton:
            '!left-auto !top-2.5 !-right-1 !border-none !bg-transparent',
        },
      }}
    />
  );
};
Toaster.displayName = 'Toaster';

export { Toaster };
