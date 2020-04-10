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
  setChangingSource,
  cardShown,
  setCardShown,
  chosenSourceIndex,
  setSourceIndexAndStorage,
  sourceListNoCarousel,
  setSourceListNoCarousel,
}) => {
  const [, setSourcesData] = useSourcesData();
  const sliderRef = useRef(null);
  const {
    data: sourcesData,
    isLoading: isLoadingSourcesData,
    isError: isErrorSourcesData,
  } = useGetFromUrl(`${process.env.REACT_APP_API_URL}/sources/all`);

  const handleChangeSource = useCallback(() => {
    setChangingSource(true);
    localStorage.removeItem('currentIndex');
    setTimeout(() => {
      setSourceListNoCarousel(true);
      setCardShown(false);
    }, 0);
  }, [setChangingSource, setCardShown, setSourceListNoCarousel]);

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
    onEntered: () => {
      // Timeout as callback firing before animation ends
      setTimeout(() => {
        setSourceListNoCarousel(false);
      }, 10);
    },
    onExited: () => setChangingSource(false),
  };

  const sourceCardSettings = {
    changeSource: handleChangeSource,
    isLoadingOrError: isLoadingSourcesData || isErrorSourcesData,
    isSingle: true,
  };

  return (
    <>
      {!sourceListNoCarousel ? (
        // * extra div needed to stop https://github.com/akiran/react-slick/issues/1557
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
  chosenSourceIndex: PropTypes.number,
  setSourceIndexAndStorage: PropTypes.func.isRequired,
  sourceListNoCarousel: PropTypes.bool.isRequired,
  cardShown: PropTypes.bool.isRequired,
  setCardShown: PropTypes.func.isRequired,
  setSourceListNoCarousel: PropTypes.func.isRequired,
};

SourceCardContainer.defaultProps = {
  chosenSourceIndex: null,
};

export default SourceCardContainer;
