import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Slider from 'react-slick';

import { useGetFromArrayOfUrls } from '../utils/hooks';
import { useSourcesData } from '../context/sourcesDataContext';

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

  const handleChangeSource = useCallback(() => {
    setChangingSource(true);
    localStorage.removeItem('currentIndex');
    setTimeout(() => {
      setSourceListNoCarousel(true);
      setCardShown(false);
    }, 0);
  }, [setCardShown, setSourceListNoCarousel]);

  const {
    data: sourcesData,
    isLoading: isLoadingSourcesData,
    isError: isErrorSourcesData,
  } = useGetFromArrayOfUrls(
    sources.map(
      source => `${process.env.REACT_APP_API_URL}/sources/${source.id}`,
    ),
  );

  setSourcesData(sourcesData);

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

  const sliderSettings = {
    afterChange: index => setSourceIndexAndStorage(index),
    arrows: false,
    draggable: false,
    infinite: false,
    initialSlide: chosenSourceIndex,
    lazyLoad: 'progressive',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sourceCardSettings = {
    changeSource: handleChangeSource,
    isLoadingOrError: isLoadingSourcesData || isErrorSourcesData,
    isSingle: true,
  };

  return (
    <>
      {!sourceListNoCarousel ? (
        <Slider {...sliderSettings}>
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
