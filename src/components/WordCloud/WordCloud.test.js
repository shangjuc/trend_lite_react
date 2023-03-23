import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WordCloud from './WordCloud';

describe('<WordCloud />', () => {
  test('it should mount', () => {
    render(<WordCloud />);
    
    const wordCloud = screen.getByTestId('WordCloud');

    expect(wordCloud).toBeInTheDocument();
  });
});