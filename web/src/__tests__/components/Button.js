import React from 'react';
import { render, cleanup } from 'react-testing-library';

import Button from '../../components/Button';

afterEach(cleanup);

test('It renders the correct text', () => {
  const mockText = 'this is some text';
  const { getByText } = render(<Button text={mockText} />);

  expect(getByText(mockText)).toBeInTheDocument();
});
