import React, { useEffect, useReducer, useMemo } from 'react';
import _debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { useGetFromUrl } from '../utils/hooks';
import { SourcesDataProvider } from '../context/sourcesDataContext';

import { Slide } from './Slide';
import SourceList from './SourceList';
import SourceCardContainer from './SourceCardContainer';
import Loader from './Loader';

const useStyles = makeStyles(() => ({
  sources: {
    height: '100%',
    width: '100%',
    maxWidth: 450,
    position: 'absolute',
  },
}));

const reducer = (prevState, action) => ({
  ...prevState,
  ...action,
});

const init = ({ existingCardIndex }) => {
  const isExistingCardIndex = Number.isInteger(existingCardIndex);

  return {
    changingSource: false,
    isExistingCardIndex,
    chosenSourceIndex: isExistingCardIndex ? existingCardIndex : null,
    cardShown: isExistingCardIndex,
    sourceListNoCarousel: !isExistingCardIndex,
  };
};

const Body = ({ isFreshLoad }) => {
  const classes = useStyles();

  const existingCardIndex = useMemo(
    () =>
      !isFreshLoad &&
      localStorage.getItem('currentIndex') !== null &&
      Number(localStorage.getItem('currentIndex')),
    [isFreshLoad],
  );

  const [state, dispatch] = useReducer(reducer, { existingCardIndex }, init);

  const { data: sources, isLoading, isError } = useGetFromUrl(
    `${process.env.REACT_APP_API_URL}/sources`,
  );

  const setSourceIndexAndStorage = index => {
    dispatch({ chosenSourceIndex: index });
    localStorage.setItem('currentIndex', index);
  };

  const handleSetChosenSourceIndex = source => {
    setSourceIndexAndStorage(sources.findIndex(s => s.id === source.id));
    dispatch({ cardShown: true });
  };

  useEffect(() => {
    const handleResize = _debounce(
      () => dispatch({ sourceListNoCarousel: true }),
      100,
    );

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoading || isError) {
    return <Loader />;
  }

  const slideSettings = {
    appear: state.changingSource,
    direction: 'down',
    enter: state.changingSource,
    in: !state.cardShown,
  };

  const sourceCardContainerSettings = {
    changingSource: state.changingSource,
    cardShown: state.cardShown,
    chosenSourceIndex: state.chosenSourceIndex,
    dispatch,
    setCardShown: state.setCardShown,
    setSourceIndexAndStorage,
    sourceListNoCarousel: state.sourceListNoCarousel,
    sources,
  };

  return (
    <>
      <div className={classes.sources}>
        <SourcesDataProvider>
          <SourceCardContainer {...sourceCardContainerSettings} />
        </SourcesDataProvider>
      </div>

      <Slide {...slideSettings}>
        <SourceList sources={sources} onClick={handleSetChosenSourceIndex} />
      </Slide>
    </>
  );
};

Body.propTypes = {
  isFreshLoad: PropTypes.bool.isRequired,
};

export default Body;
