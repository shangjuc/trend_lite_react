import React, { lazy, Suspense } from 'react';

const LazyWordCloud = lazy(() => import('./WordCloud'));

const WordCloud = props => (
  <Suspense fallback={null}>
    <LazyWordCloud {...props} />
  </Suspense>
);

export default WordCloud;
