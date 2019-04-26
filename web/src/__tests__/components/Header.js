import React from 'react';

import Header from '../../components/Header';

test('Header renders the correct text', () => {
  const mockSetHeight = jest.fn();
  const { getByText } = global.renderWithTheme(
    <Header setHeight={mockSetHeight} />,
  );

  expect(getByText('Show Me...')).toBeInTheDocument();
  expect(getByText('The Top Of')).toBeInTheDocument();
});
