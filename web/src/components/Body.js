import React, { useState, useCallback } from 'react';
import Slide from '@material-ui/core/Slide';

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
  const [cardShown, setCardShown] = useState(false);

  const handleChangeSource = useCallback(() => {
    setCardShown(false);
  }, []);

  const handleSetChosenSource = source => {
    setChosenSource(source);
    setCardShown(true);
  };

  if (isLoading || isError) {
    return <Loader />;
  }

  const timeout = { enter: 400, exit: 180 };

  return (
    <>
      <Slide
        direction="up"
        in={cardShown}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
      >
        <SourceCard
          chosenSource={chosenSource}
          cardShown={cardShown}
          changeSource={handleChangeSource}
        />
      </Slide>
      <SourceList sources={sources} onClick={handleSetChosenSource} />
    </>
  );
};

export default Body;
