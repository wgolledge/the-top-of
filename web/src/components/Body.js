import React, { useState, useEffect } from 'react';
import _debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

import { useGetFromUrl } from '../utils/hooks';
import { SourcesDataProvider } from '../context/sourcesDataContext';

import SourceList from './SourceList';
import SourceCardContainer from './SourceCardContainer';
import Loader from './Loader';

const Body = ({ isFreshLoad }) => {
  const { data: sources, isLoading, isError } = useGetFromUrl(
    `${process.env.REACT_APP_API_URL}/sources`,
  );

  const existingCardIndex =
    !isFreshLoad && Number(localStorage.getItem('currentIndex'));

  const [chosenSourceIndex, setChosenSourceIndex] = useState(null);
  const [cardShown, setCardShown] = useState(
    Number.isInteger(existingCardIndex),
  );
  const [sourceListNoCarousel, setSourceListNoCarousel] = useState(
    !Number.isInteger(existingCardIndex),
  );

  const setSourceIndexAndStorage = index => {
    setChosenSourceIndex(index);
    localStorage.setItem('currentIndex', index);
  };

  const handleSetChosenSourceIndex = source => {
    setSourceIndexAndStorage(sources.findIndex(s => s.id === source.id));
    setCardShown(true);
  };

  useEffect(() => {
    if (existingCardIndex) {
      setChosenSourceIndex(Number(existingCardIndex));
    }
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
    setSourceIndexAndStorage,
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

Body.propTypes = {
  isFreshLoad: PropTypes.bool.isRequired,
};

export default Body;
