import React from 'react';
import axiosMock from 'axios';
import { wait, fireEvent } from 'react-testing-library';

import Body from '../../components/Body';
import mockSources from '../../__mocks__/api/mockSources.json';

const mockIndex = 0;
const mockSource = mockSources.data[0];

afterEach(() => {
  axiosMock.get.mockRestore();
});

test('Renders correct text and sources', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: mockSources });

  const { getByText } = global.renderWithTheme(<Body isFreshLoad />);

  await wait(() => {
    expect(getByText('Choose a source')).toBeInTheDocument();
  });

  mockSources.data.forEach(source => {
    expect(getByText(source.name)).toBeInTheDocument();
  });

  // One for list of sources, then another one per source
  expect(axiosMock.get).toHaveBeenCalledTimes(1 + mockSources.data.length);

  fireEvent.click(getByText(mockSource.name).parentNode);

  expect(localStorage.getItem('currentIndex')).toBe(`${mockIndex}`);
});

test('Renders loading spinner if isLoading or isError from api', () => {
  const { queryByText, getByTestId } = global.renderWithTheme(
    <Body isFreshLoad />,
  );

  axiosMock.get.mockImplementation(() => {
    throw new Error();
  });

  expect(queryByText('Choose a source')).not.toBeInTheDocument();

  expect(getByTestId('loading-spinner')).toBeInTheDocument();

  // Only called once as app never gets as far as populating context with other sources
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
});

test('Renders card if isFreshLoad false and localStorage contains currentIndex', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: mockSources });

  localStorage.setItem('currentIndex', mockIndex);
  const { queryByText, getByText } = global.renderWithTheme(
    <Body isFreshLoad={false} />,
  );

  axiosMock.get.mockImplementation(() => {
    throw new Error();
  });

  expect(queryByText('Choose a source')).not.toBeInTheDocument();

  await wait(() => {
    expect(getByText(mockSource.name)).toBeInTheDocument();
  });

  // Called twice as app now starts populating context with other sources
  expect(axiosMock.get).toHaveBeenCalledTimes(2);
});
