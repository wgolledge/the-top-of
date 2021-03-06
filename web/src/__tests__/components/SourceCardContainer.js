import React from 'react';
import { waitFor, cleanup } from '@testing-library/react';
import axiosMock from 'axios';

import SourceCardContainer from '../../components/SourceCardContainer';
import mockSourcesData from '../../__mocks__/api/mockSourcesData.json';
import mockSources from '../../__mocks__/api/mockSources.json';
import { SourcesDataContext } from '../../context/sourcesDataContext';

afterEach(cleanup);

// eslint-disable-next-line
export const withSourcesDataProvider = Component => props => (
  <SourcesDataContext.Provider value={[mockSourcesData, jest.fn()]}>
    <Component {...props} />
  </SourcesDataContext.Provider>
);

const SourceCardContainerWP = withSourcesDataProvider(SourceCardContainer);

const mockIndex = 0;

const defaultSettings = {
  chosenSourceIndex: mockIndex,
  changingSource: false,
  dispatch: jest.fn(),
  sources: mockSources.data,
  setSourceIndexAndStorage: jest.fn(),
  sourceListNoCarousel: true,
  cardShown: true,
  setCardShown: jest.fn(),
  setSourceListNoCarousel: jest.fn(),
};

test('Renders a single sourceCard when sourceListNoCarousel true, calls axios for all sources', async () => {
  axiosMock.mockResolvedValueOnce(mockSourcesData[0].data[mockIndex]);

  const { getByText, queryByText } = global.renderWithTheme(
    <SourceCardContainerWP {...defaultSettings} />,
  );

  await waitFor(() => {
    mockSources.data.forEach((mockSource, i) => {
      if (i === mockIndex) {
        expect(getByText(mockSource.banner.text)).toBeInTheDocument();
        expect(getByText(mockSource.banner.text)).toBeInTheDocument();
      } else {
        expect(queryByText(mockSource.banner.text)).toBe(null);
      }
    });
  });

  // Called once for all source data
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
});
