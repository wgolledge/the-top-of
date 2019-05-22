import React from 'react';
import { render } from '@testing-library/react';

import Index from '../../pages/index';

it('renders without crashing', () => {
  render(<Index />);
});
