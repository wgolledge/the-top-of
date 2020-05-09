import React, { useCallback, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { isMobile } from 'react-device-detect';

import { useGetFromUrl } from '../utils/hooks';
import { useSourcesData } from '../context/sourcesDataContext';
import { history } from '../pages/index';

import { Slide } from './Slide';
import SourceCard from './SourceCard';

const SourceCardContainer = ({
  sources,
  changingSource,
  cardShown,
  chosenSourceIndex,
  dispatch,
  setSourceIndexAndStorage,
  sourceListNoCarousel,
}) => {
  const [, setSourcesData] = useSourcesData();
  const sliderRef = useRef(null);
  const {
    data: sourcesData,
    isLoading: isLoadingSourcesData,
    isError: isErrorSourcesData,
  } = useGetFromUrl(`${process.env.REACT_APP_API_URL}/sources/all`);
  
  const handleChangeSource = useCallback(() => {
    dispatch({ changingSource: true });
    localStorage.removeItem('currentIndex');
    Promise.resolve(true).then(() => {
      dispatch({ sourceListNoCarousel: true });
      dispatch({ cardShown: false });
    });
  }, [dispatch]);

  useEffect(() => {
    let unblock = () => {};

    if (cardShown) {
      history.push('/');

      unblock = history.block((location, action) => {
        if (action === 'POP') handleChangeSource();
      });
    } else {
      unblock();
    }

    return unblock;
  }, [cardShown, handleChangeSource]);

  useEffect(() => {
    setSourcesData(sourcesData);
  }, [sourcesData, setSourcesData]);

  const onSwipe = useCallback(() => {
    if (sliderRef) {
      sliderRef.current.innerSlider.clickable = true;
    }
  }, []);

  const sliderSettings = useMemo(
    () => ({
      afterChange: index => setSourceIndexAndStorage(index),
      arrows: false,
      dots: isMobile,
      draggable: false,
      infinite: false,
      initialSlide: chosenSourceIndex,
      lazyLoad: 'progressive',
      onSwipe,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
    }),
    [setSourceIndexAndStorage, chosenSourceIndex, onSwipe],
  );

  const slideSettings = {
    appear: !changingSource,
    enter: !changingSource,
    direction: 'up',
    in: cardShown,
    onEntered: () => dispatch({ sourceListNoCarousel: false }),
    onExited: () => dispatch({ changingSource: false }),
  };

  const sourceCardSettings = {
    changeSource: handleChangeSource,
    isLoadingOrError: isLoadingSourcesData || isErrorSourcesData,
    isSingle: true,
  };

  return (
    <>
      {!sourceListNoCarousel ? (
        <Slider ref={sliderRef} {...sliderSettings}>
          {sources.map(source => (
            <SourceCard
              {...sourceCardSettings}
              chosenSource={source}
              key={source.id}
              isSingle={false}
            />
          ))}
        </Slider>
      ) : (
        <Slide {...slideSettings}>
          <SourceCard
            {...sourceCardSettings}
            chosenSource={sources[chosenSourceIndex]}
          />
        </Slide>
      )}
    </>
  );
};

SourceCardContainer.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cardShown: PropTypes.bool.isRequired,
  changingSource: PropTypes.bool.isRequired,
  chosenSourceIndex: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  setSourceIndexAndStorage: PropTypes.func.isRequired,
  sourceListNoCarousel: PropTypes.bool.isRequired,
};

SourceCardContainer.defaultProps = {
  chosenSourceIndex: null,
};

export default SourceCardContainer;
