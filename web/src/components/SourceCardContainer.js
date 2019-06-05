import React, { useCallback, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Slider from 'react-slick';
import { isMobile } from 'react-device-detect';

import { useGetFromUrl } from '../utils/hooks';
import { useSourcesData } from '../context/sourcesDataContext';
import { history } from '../pages/index';

import SourceCard from './SourceCard';

const SourceCardContainer = ({
  sources,
  cardShown,
  setCardShown,
  chosenSourceIndex,
  setSourceIndexAndStorage,
  sourceListNoCarousel,
  setSourceListNoCarousel,
}) => {
  const [, setSourcesData] = useSourcesData();
  const [changingSource, setChangingSource] = useState(false);
  const sliderRef = useRef(null);

  const handleChangeSource = useCallback(() => {
    setChangingSource(true);
    localStorage.removeItem('currentIndex');
    setTimeout(() => {
      setSourceListNoCarousel(true);
      setCardShown(false);
    }, 0);
  }, [setCardShown, setSourceListNoCarousel]);

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

  let {
    data: sourcesData,
    isLoading: isLoadingSourcesData,
    isError: isErrorSourcesData,
  } = useGetFromUrl(`${process.env.REACT_APP_API_URL}/sources/all`);

  if (sourcesData.length === 0) {
    ({
      data: sourcesData,
      isLoading: isLoadingSourcesData,
      isError: isErrorSourcesData,
    } = useGetFromUrl(`${process.env.REACT_APP_API_URL}/sources/all`));
  }

  setSourcesData(sourcesData);

  const onSwipe = () => {
    if (sliderRef) {
      sliderRef.current.innerSlider.clickable = true;
    }
  };

  const sliderSettings = {
    afterChange: index => setSourceIndexAndStorage(index),
    arrows: false,
    dots: isMobile,
    draggable: true,
    infinite: false,
    initialSlide: chosenSourceIndex,
    lazyLoad: 'progressive',
    onSwipe,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slideSettings = {
    appear: !changingSource,
    direction: 'up',
    enter: !changingSource,
    in: cardShown,
    timeout: { enter: 250, exit: 180 },
    mountOnEnter: true,
    unmountOnExit: true,
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
        <Slider ref={sliderRef} {...sliderSettings} className>
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
