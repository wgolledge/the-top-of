import React from 'react';
import axiosMock from 'axios';
import { wait } from 'react-testing-library';

import Body from '../../components/Body';
import mockSourcesData from '../../__mocks__/api/mockSourcesData.json';

afterEach(() => {
  axiosMock.get.mockRestore();
});

test('Renders correct text and sources', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: mockSourcesData });

  const { getByText } = global.renderWithTheme(<Body />);

  await wait(() => {
    expect(
      getByText('Choose which source you would like to see!'),
    ).toBeInTheDocument();
  });

  mockSourcesData.data.forEach(source => {
    expect(getByText(source.name)).toBeInTheDocument();
  });
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
});

test('Renders loading spinner if isLoading or isError from api', () => {
  const { queryByText, getByTestId } = global.renderWithTheme(<Body />);

  axiosMock.get.mockImplementation(() => {
    throw new Error();
  });

  expect(
    queryByText('Choose which source you would like to see!'),
  ).not.toBeInTheDocument();

  expect(getByTestId('loading-spinner')).toBeInTheDocument();
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
});
