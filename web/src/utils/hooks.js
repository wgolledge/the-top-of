import { useState, useEffect, useCallback } from 'react';

import axios from './axiosWithDuration';
import { setTheme } from './withRoot';

export const useGetFromUrl = url => {
  const LONG_REQUEST_LIMIT = 50;
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const setData = useCallback((data, duration) => {
    setResponse(data);

    if (!duration || duration < LONG_REQUEST_LIMIT) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        let {
          data: { data, error },
          duration,
        } = await axios.get(url);

        if (data.length !== 0 && data) {
          setData(data, duration);
          return;
        }

        // assignment without declaration
        ({
          data: { data, error },
          duration,
        } = await axios.get(url));

        if (data) {
          setData(data, duration);
        }

        setIsError(true);
        if (error) {
          setResponse(error);
        } else {
          throw new Error('Error accesssing response data');
        }
      } catch (error) {
        setIsError(true);
      }
    };

    getData();
  }, [url, setData]);

  return { data: response, isLoading, isError };
};

export const useGetFromArrayOfUrls = urlArr => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const urlData = await Promise.all(urlArr.map(url => axios.get(url)));

        if (urlData) {
          setResponse(
            urlData.map(({ data: { data } }, id) => ({
              data,
              id,
            })),
          );

          setIsLoading(false);
        } else {
          throw new Error('Error accessing response data');
        }
      } catch (error) {
        setIsError(true);
      }
    };

    getData();
  }, [urlArr]);

  return { data: response, isLoading, isError };
};

export const useDarkMode = () => {
  const theme = localStorage.getItem('theme');
  const [enabled, setEnabled] = useState(theme !== 'light');

  useEffect(() => {
    const themeColor = enabled ? 'dark' : 'light';

    setTheme(themeColor);
  }, [enabled]);

  return [enabled, setEnabled];
};

export default {
  useGetFromUrl,
  useDarkMode,
};
