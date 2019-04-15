import React from 'react';
import axiosMock from 'axios';
import { wait, fireEvent } from 'react-testing-library';

import SourceCard from '../../components/SourceCard';
import mockSourceData from '../../__mocks__/api/mockSourceData.json';
import mockSourcesData from '../../__mocks__/api/mockSourcesData.json';

afterEach(() => {
  axiosMock.get.mockRestore();
});
const mockChosenSource = mockSourcesData.data[0];

test('Renders correct chosenSource and list of urls plus calls changeSource function onClick', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: mockSourceData });

  const mockChangeSource = jest.fn();

  const { getByText } = global.renderWithTheme(
    <SourceCard
      chosenSource={mockChosenSource}
      changeSource={mockChangeSource}
    />,
  );

  await wait(() => {
    expect(getByText(mockChosenSource.name)).toBeInTheDocument();
  });

  mockSourceData.data.forEach(source => {
    expect(getByText(source.title)).toBeInTheDocument();
  });
  expect(axiosMock.get).toHaveBeenCalledTimes(1);

  fireEvent.click(getByText(/change source/i));

  expect(mockChangeSource).toHaveBeenCalledTimes(1);
});

test('Renders loading spinner if isLoading or isError from api', () => {
  const { queryByText, getByTestId } = global.renderWithTheme(
    <SourceCard chosenSource={mockChosenSource} changeSource={jest.fn()} />,
  );

  axiosMock.get.mockImplementation(() => {
    throw new Error();
  });

  expect(queryByText(mockChosenSource.name)).not.toBeInTheDocument();

  expect(getByTestId('loading-spinner')).toBeInTheDocument();
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
});
