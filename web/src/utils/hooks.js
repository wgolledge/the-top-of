import { useState, useEffect } from 'react';

import axios from './axiosWithDuration';

export const useGetFromUrl = (url, minTimeIfLongReq = 0) => {
  const LONG_REQUEST_LIMIT = 50;
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRetrievingData, setIsRetrievingData] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLongerThanMinTime, setIsLongerThanMinTime] = useState(false);

  setTimeout(() => {
    setIsLongerThanMinTime(true);
  }, minTimeIfLongReq);

  useEffect(() => {
    const getData = async () => {
      setIsError(false);
      setIsRetrievingData(true);

      try {
        const {
          data: { data, error },
          duration,
        } = await axios.get(url);

        if (data) {
          setResponse(data);

          if (duration < LONG_REQUEST_LIMIT) {
            setIsLoading(false);
            return;
          }
        } else if (error) {
          setResponse(error);
        } else {
          throw new Error('Error accessing response data');
        }
      } catch (error) {
        setIsError(true);
      }

      if (isLongerThanMinTime) {
        setIsLoading(false);
        return;
      }

      setIsRetrievingData(false);
    };

    getData();
  }, []);

  useEffect(() => {
    if (!isRetrievingData && isLongerThanMinTime) {
      setIsLoading(false);
    }
  }, [isRetrievingData, isLongerThanMinTime]);

  return { data: response, isLoading, isError };
};

export default {
  useGetFromUrl,
};
