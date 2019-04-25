/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Slider from 'react-slick';

import { useGetFromArrayOfUrls } from '../utils/hooks';
import { useSourcesData } from '../context/sourcesDataContext';

import SourceCard from './SourceCard';

const SourceCardContainer = ({
  sources,
  chosenSourceIndex,
  setChosenSourceIndex,
  changingSource,
  sourceListShown,
  cardShown,
  handleChangeSource,
  setSourceListShown,
  setChangingSource,
}) => {
  const [, setSourcesData] = useSourcesData();

  const {
    data: sourcesData,
    isLoading: isLoadingSourcesData,
    isError: isErrorSourcesData,
  } = useGetFromArrayOfUrls(
    sources.map(
      source => `${process.env.REACT_APP_API_URL}/sources/${source.id}`,
    ),
  );

  if (!isLoadingSourcesData && !isErrorSourcesData) {
    setSourcesData(sourcesData);
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
    afterChange: index => setChosenSourceIndex(index),
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
    </>
  );
};

SourceCardContainer.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

SourceCardContainer.defaultProps = {
  onClick: undefined,
};

export default SourceCardContainer;
