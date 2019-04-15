import React from 'react';
import { render } from 'react-testing-library';

import Index from '../../pages/index';

it('renders without crashing', () => {
  render(<Index />);
});
