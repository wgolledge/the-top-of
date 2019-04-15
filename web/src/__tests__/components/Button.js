import React from 'react';
import { render } from 'react-testing-library';

import Button from '../../components/Button';

test('It renders the correct text', () => {
  const mockText = 'this is some text';
  const { getByText } = render(<Button text={mockText} />);

  expect(getByText(mockText)).toBeInTheDocument();
});
