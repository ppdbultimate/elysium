import * as React from 'react';

const useRenderCount = () => {
  const count = React.useRef(1);
  React.useEffect(() => {
    count.current += 1;
  });
  return count.current;
};

export { useRenderCount };
