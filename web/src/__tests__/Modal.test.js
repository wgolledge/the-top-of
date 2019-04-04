import React from 'react';
import axios from 'axios';
import { render, fireEvent, wait } from 'react-testing-library';
import { ThemeProvider } from '@material-ui/styles';

import Modal from '../components/Modal';
import { theme } from '../App';

jest.mock('axios');

const ModalWithTheme = (
  <ThemeProvider theme={theme}>
    <Modal />
  </ThemeProvider>
);

const mockSourcesData = [
  { id: 1, name: 'Hacker News' },
  { id: 2, name: 'The Guardian' },
];

test('Modal renders correct text and sources once the open modal button is pressed', async () => {
  axios.get.mockResolvedValue({
    data: mockSourcesData,
  });

  const { getByText } = render(ModalWithTheme);

  fireEvent.click(getByText('... THE TOP OF'));

  await wait();

  expect(getByText('Available news sources')).toBeInTheDocument();
  expect(
    getByText('Choose which news source you would like to see'),
  ).toBeInTheDocument();

  mockSourcesData.forEach(source => {
    expect(getByText(source.name)).toBeInTheDocument();
  });
});
