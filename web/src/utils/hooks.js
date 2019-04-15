import { useState, useEffect } from 'react';
import { get } from 'axios';

export const useGetFromUrl = (url, minTime = 0) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRetrievingData, setIsRetrievingData] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLongerThanMinTime, setIsLongerThanMinTime] = useState(false);

  setTimeout(() => {
    setIsLongerThanMinTime(true);
  }, minTime);

  useEffect(() => {
    const getData = async () => {
      setIsError(false);
      setIsRetrievingData(true);

      try {
        const {
          data: { data, error },
        } = await get(url);

        if (data) {
          setResponse(data);
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
