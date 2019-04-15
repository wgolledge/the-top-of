import React, { useState } from 'react';

import { useGetFromUrl } from '../utils/hooks';

import SourceList from './SourceList';
import SourceCard from './SourceCard';
import Loader from './Loader';

const Body = () => {
  const { data: sources, isLoading, isError } = useGetFromUrl(
    `${process.env.REACT_APP_API_URL}/sources`,
    300,
  );
  const [chosenSource, setChosenSource] = useState(null);

  const handleChangeSource = () => {
    setChosenSource(null);
  };

  const handleSetChosenSource = source => {
    setChosenSource(source);
  };

  if (isLoading || isError) {
    return <Loader />;
  }

  return (
    <>
      {chosenSource ? (
        <SourceCard
          chosenSource={chosenSource}
          changeSource={handleChangeSource}
        />
      ) : (
        <SourceList sources={sources} onClick={handleSetChosenSource} />
      )}
    </>
  );
};

export default Body;
