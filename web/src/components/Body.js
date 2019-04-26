import React, { useState, useEffect } from 'react';
import _debounce from 'lodash.debounce';

import { useGetFromUrl } from '../utils/hooks';
import { SourcesDataProvider } from '../context/sourcesDataContext';

import SourceList from './SourceList';
import SourceCardContainer from './SourceCardContainer';
import Loader from './Loader';

const Body = () => {
  const { data: sources, isLoading, isError } = useGetFromUrl(
    `${process.env.REACT_APP_API_URL}/sources`,
    300,
  );
  const [chosenSourceIndex, setChosenSourceIndex] = useState(null);
  const [cardShown, setCardShown] = useState(false);
  const [sourceListNoCarousel, setSourceListNoCarousel] = useState(true);

  const handleSetChosenSourceIndex = source => {
    setChosenSourceIndex(sources.findIndex(s => s.id === source.id));
    setCardShown(true);
  };

  useEffect(() => {
    const handleResize = _debounce(() => setSourceListNoCarousel(true), 100);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoading || isError) {
    return <Loader />;
  }

  const sourceCardContainerSettings = {
    cardShown,
    chosenSourceIndex,
    setCardShown,
    setChosenSourceIndex,
    setSourceListNoCarousel,
    sourceListNoCarousel,
    sources,
  };

  return (
    <>
      <SourcesDataProvider>
        <SourceCardContainer {...sourceCardContainerSettings} />
      </SourcesDataProvider>

      {sourceListNoCarousel && (
        <SourceList sources={sources} onClick={handleSetChosenSourceIndex} />
      )}
    </>
  );
};

export default Body;
