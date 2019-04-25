import React, { useState, useCallback, useEffect } from 'react';
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
  const [sourceListShown, setSourceListShown] = useState(true);
  const [changingSource, setChangingSource] = useState(false);

  const handleChangeSource = useCallback(() => {
    setCardShown(true);
    setChangingSource(true);
    setTimeout(() => {
      setSourceListShown(true);
      setCardShown(false);
    }, 0);
  }, []);

  const handleSetChosenSourceIndex = source => {
    setChosenSourceIndex(sources.findIndex(s => s.id === source.id));
    setCardShown(true);
  };

  useEffect(() => {
    const handleResize = _debounce(() => setSourceListShown(true), 100);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoading || isError) {
    return <Loader />;
  }

  const sourceCardContainerSettings = {
    sources,
    chosenSourceIndex,
    setChosenSourceIndex,
    changingSource,
    sourceListShown,
    cardShown,
    handleChangeSource,
    setSourceListShown,
    setChangingSource,
  };

  return (
    <>
      <SourcesDataProvider>
        <SourceCardContainer {...sourceCardContainerSettings} />
      </SourcesDataProvider>

      {sourceListShown && (
        <SourceList sources={sources} onClick={handleSetChosenSourceIndex} />
      )}
    </>
  );
};

export default Body;
