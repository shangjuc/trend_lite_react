import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Wc from './Wc';

describe('<Wc />', () => {
  test('it should mount', () => {
    render(<Wc />);
    
    const wc = screen.getByTestId('Wc');

    expect(wc).toBeInTheDocument();
  });
});