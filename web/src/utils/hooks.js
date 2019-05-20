import { useState, useEffect } from 'react';

import axios from './axiosWithDuration';
import { setTheme } from './withRoot';

export const useGetFromUrl = (url, minTimeIfLongReq = 0) => {
  const LONG_REQUEST_LIMIT = 50;
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { data, error },
          duration,
        } = await axios.get(url);

        if (data) {
          setResponse(data);

          if (!duration || duration < LONG_REQUEST_LIMIT) {
            setIsLoading(false);
            return;
          }

          setTimeout(() => {
            setIsLoading(false);
          }, minTimeIfLongReq - duration);
        } else if (error) {
          setResponse(error);
        } else {
          throw new Error('Error accessing response data');
        }
      } catch (error) {
        setIsError(true);
      }
    };

    getData();
  }, [minTimeIfLongReq, url]);

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
  const [enabled, setEnabled] = useState(theme === 'dark');

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
