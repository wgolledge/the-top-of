import React from 'react';
import { wait, fireEvent } from 'react-testing-library';

import SourceCard from '../../components/SourceCard';
import mockSources from '../../__mocks__/api/mockSources.json';
import mockSourcesData from '../../__mocks__/api/mockSourcesData.json';
import { SourcesDataContext } from '../../context/sourcesDataContext';

afterEach(() => {
  jest.clearAllMocks();
});
const mockChosenSource = mockSources.data[0];
const mockChangeSource = jest.fn();

const defaultSettings = {
  chosenSource: mockChosenSource,
  changeSource: mockChangeSource,
  isSingle: true,
  isLoadingOrError: false,
};

test('Renders correct chosenSource and list of urls plus calls changeSource function onClick', async () => {
  const { getByText } = global.renderWithTheme(
    <SourcesDataContext.Provider value={[mockSourcesData, jest.fn()]}>
      <SourceCard {...defaultSettings} />
    </SourcesDataContext.Provider>,
  );

  await wait(() => {
    expect(getByText(mockChosenSource.name)).toBeInTheDocument();
  });

  mockSourcesData[0].data.forEach(source => {
    expect(getByText(source.title)).toBeInTheDocument();
  });

  // Change window size so click outside of area not triggered
  global.innerWidth = 0;

  fireEvent.click(getByText(/change source/i).parentNode);

  expect(mockChangeSource).toHaveBeenCalledTimes(1);
});

test('Renders loading spinner if isLoading or isError from api', () => {
  const { queryByText, getByTestId } = global.renderWithTheme(
    <SourcesDataContext.Provider value={[mockSourcesData, jest.fn()]}>
      <SourceCard {...defaultSettings} isLoadingOrError />,
    </SourcesDataContext.Provider>,
  );

  mockSourcesData[0].data.forEach(source => {
    expect(queryByText(source.title)).not.toBeInTheDocument();
  });

  expect(getByTestId('loading-spinner')).toBeInTheDocument();
});
