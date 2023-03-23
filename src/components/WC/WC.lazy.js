import React, { lazy, Suspense } from 'react';

const LazyWc = lazy(() => import('./Wc'));

const Wc = props => (
  <Suspense fallback={null}>
    <LazyWc {...props} />
  </Suspense>
);

export default Wc;
