import React from 'react';
import { wait } from 'react-testing-library';
import axiosMock from 'axios';

import SourceCardContainer from '../../components/SourceCardContainer';
import mockSourcesData from '../../__mocks__/api/mockSourcesData';
import mockSources from '../../__mocks__/api/mockSources';
import { SourcesDataContext } from '../../context/sourcesDataContext';

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

  await wait(() => {
    mockSources.data.forEach((mockSource, i) => {
      if (i === mockIndex) {
        expect(getByText(mockSource.name)).toBeInTheDocument();
      } else {
        expect(queryByText(mockSource.name)).toBe(null);
      }
    });
  });

  expect(axiosMock.get).toHaveBeenCalledTimes(mockSources.data.length);
});

test('Renders the carousel when sourceListNoCarousel false', async () => {
  const { getByTitle } = global.renderWithTheme(
    <SourceCardContainerWP {...defaultSettings} sourceListNoCarousel={false} />,
  );

  await wait(() => {
    mockSources.data.forEach(mockSource => {
      expect(getByTitle(mockSource.name)).toBeInTheDocument();
    });
  });
});
