import React from 'react';
import { cleanup } from '@testing-library/react';

import Header from '../../components/Header';

afterEach(cleanup);

test('Header renders the correct text', () => {
  const mockSetHeight = jest.fn();
  const { getByText } = global.renderWithTheme(
    <Header setHeight={mockSetHeight} />,
  );

  expect(getByText('Show Me...')).toBeInTheDocument();
  expect(getByText('The Top Of')).toBeInTheDocument();
});
