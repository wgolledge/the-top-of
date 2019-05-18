import React from 'react';
import axiosMock from 'axios';
import { wait, fireEvent, cleanup } from 'react-testing-library';

import Body from '../../components/Body';
import mockSources from '../../__mocks__/api/mockSources.json';

const mockIndex = 0;
const mockSource = mockSources.data[0];

afterEach(() => {
  axiosMock.get.mockRestore();
  cleanup();
});

const pickSourceText = /choose a source/i;

test('Renders correct text and sources', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: mockSources });

  const { getByText } = global.renderWithTheme(<Body isFreshLoad />);

  await wait(() => {
    expect(getByText(pickSourceText)).toBeInTheDocument();
  });

  mockSources.data.forEach(source => {
    expect(getByText(source.name)).toBeInTheDocument();
  });

  // Called once for list of sources, and one for source data
  expect(axiosMock.get).toHaveBeenCalledTimes(2);

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

  expect(queryByText(pickSourceText)).not.toBeInTheDocument();

  expect(getByTestId('loading-spinner')).toBeInTheDocument();

  // Only called once as app never gets as far as populating context with other sources
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
});

test(`Renders card if isFreshLoad false and localStorage contains currentIndex
      Then closes card if window back button pressed`, async () => {
  axiosMock.get.mockResolvedValueOnce({ data: mockSources });

  localStorage.setItem('currentIndex', mockIndex);
  const { queryByText, getByText } = global.renderWithTheme(
    <Body isFreshLoad={false} />,
  );

  expect(queryByText(pickSourceText)).not.toBeInTheDocument();

  await wait(() => {
    expect(getByText(/change source/i)).toBeInTheDocument();
  });

  // Called once for list of sources, and one for source data
  expect(axiosMock.get).toHaveBeenCalledTimes(2);

  window.history.back();

  await wait(() => {
    expect(queryByText(/change source/i)).not.toBeInTheDocument();

    expect(getByText(pickSourceText)).toBeInTheDocument();
  });
});
