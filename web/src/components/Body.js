import React, { useState, useCallback, useEffect } from 'react';
import Slide from '@material-ui/core/Slide';
import _debounce from 'lodash.debounce';
import Slider from 'react-slick';

import { useGetFromUrl } from '../utils/hooks';

import SourceList from './SourceList';
import SourceCard from './SourceCard';
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

  const timeout = { enter: 250, exit: 180 };

  const slideSettings = {
    appear: !changingSource,
    direction: 'up',
    enter: !changingSource,
    in: cardShown,
    timeout,
    mountOnEnter: true,
    unmountOnExit: true,
    onEntered: () =>
      setTimeout(() => {
        setSourceListShown(false);
      }, 10),
    onExited: () => setChangingSource(false),
  };

  const sliderSettings = {
    arrows: false,
    draggable: false,
    infinite: true,
    initialSlide: chosenSourceIndex,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {!sourceListShown ? (
        <Slider {...sliderSettings}>
          {sources.map(source => (
            <SourceCard
              chosenSource={source}
              changeSource={handleChangeSource}
              key={source.id}
              isSingle={false}
            />
          ))}
        </Slider>
      ) : (
        <Slide {...slideSettings}>
          <SourceCard
            chosenSource={sources[chosenSourceIndex]}
            changeSource={handleChangeSource}
            isSingle
          />
        </Slide>
      )}

      {sourceListShown && (
        <SourceList sources={sources} onClick={handleSetChosenSourceIndex} />
      )}
    </>
  );
};

export default Body;
