import React, {
  Suspense,
  useEffect,
  useState,
  forwardRef,
  useMemo,
} from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import { returnPropIfTrue } from '../utils/obj';
import { useSourcesData } from '../context/sourcesDataContext';

import Loader from './Loader';

const LazySourceCardList = React.lazy(() => import('./SourceCardList'));

const HEADER_HEIGHT = 60;
const ACTIONS_HEIGHT = 45;

const useStyles = (isSingle, headerBg) =>
  makeStyles(theme => ({
    root: {
      color: theme.palette.darkThemeSecondaryText,
      height: window.innerHeight - theme.header.headerHeightSmall - 30,
      [theme.header.minHeightMedia]: {
        height: window.innerHeight - theme.header.headerHeightLarge - 30,
      },
      maxWidth: theme.maxCardWidth - 20,
      margin: 10,
      position: 'absolute',
      width: window.innerWidth - 20,
      zIndex: 50,
      ...returnPropIfTrue(isSingle, { left: 0 }),
      ...returnPropIfTrue(isSingle, { top: 0 }),
    },
    cardActionArea: {
      cursor: 'auto',
      height: `calc(100% - ${ACTIONS_HEIGHT}px)`,
      '&:hover $focusHighlight': {
        opacity: 0,
      },
    },
    focusHighlight: {},
    header: {
      backgroundColor: headerBg,
      color: 'white',
      cursor: 'pointer',
      height: HEADER_HEIGHT,
      position: 'relative',
      zIndex: 1,
      margin: 0,
      padding: '0.5rem',
      textAlign: 'center',
      '& p': {
        fontSize: '0.7rem',
      },
      '& h1': {
        fontSize: '2.1rem',
        marginTop: '-0.5rem',
        fontFamily: `'Pacifico', cursive`,
      },
    },
    content: {
      height: `calc(100% - ${HEADER_HEIGHT}px)`,
    },
    contentList: {
      height: `calc(100% - ${ACTIONS_HEIGHT * 1.2}px)`,
    },
    action: {
      marginTop: `-35px`,
      padding: '0 12px',
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      zIndex: 1,
    },
    button: {
      padding: 0,
      letterSpacing: 1,
      transition: 'all 280ms ease-in-out',
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
        letterSpacing: 1.3,
      },
      '&:hover $focusHighlight': {
        opacity: 0,
      },
    },
  }));

const goToUrl = url => {
  window.location = url;
};

const SourceCard = forwardRef(
  ({ chosenSource, changeSource, isSingle, isLoadingOrError }, ref) => {
    const theme = useTheme();

    const classes = useStyles(isSingle, chosenSource.banner.color)(theme);
    const [sourcesData] = useSourcesData();
    const [sourceData, setSourceData] = useState(null);

    const handleCardMediaClick = () => {
      window.location = chosenSource.url;
    };

    useEffect(() => {
      const handleClickOutside = e => {
        const extraSpaceEitherSide =
          (window.innerWidth - theme.maxCardWidth) / 2;

        if (
          extraSpaceEitherSide > 0 &&
          e.clientY > 64 &&
          (e.clientX < extraSpaceEitherSide ||
            e.clientX > theme.maxCardWidth + extraSpaceEitherSide)
        ) {
          changeSource();
        }
      };

      document.addEventListener('click', handleClickOutside, false);
      return () => {
        document.removeEventListener('click', handleClickOutside, false);
      };
    }, [changeSource, theme.maxCardWidth]);

    useEffect(() => {
      if (!isLoadingOrError) {
        setSourceData(
          sourcesData.find(source => source.id === chosenSource.id).data,
        );
      }
    }, [isLoadingOrError, chosenSource.id, sourcesData]);

    const CardHeaderTitle = useMemo(
      () => (
        <>
          {chosenSource.banner.byline && (
            <Typography component="p">{chosenSource.banner.byline}</Typography>
          )}
          <Typography component="h1">{chosenSource.banner.text}</Typography>
        </>
      ),
      [chosenSource.banner.byline, chosenSource.banner.text],
    );

    return (
      <Card ref={ref} className={classes.root}>
        <>
          <Box height="100%">
            <CardHeader
              className={classes.header}
              onClick={handleCardMediaClick}
              title={CardHeaderTitle}
            />
            <div className={classes.content}>
              {sourceData ? (
                <Suspense fallback={<Loader />}>
                  <div className={classes.contentList}>
                    <LazySourceCardList articles={sourceData} />
                  </div>
                </Suspense>
              ) : (
                <Loader />
              )}
            </div>
          </Box>
          <CardActions className={classes.action}>
            <Grid container spacing={0} justify="flex-start">
              <Grid item xs={6}>
                <Button
                  className={classes.button}
                  size="medium"
                  color="primary"
                  onClick={changeSource}
                  disableRipple
                >
                  Change Source
                </Button>
              </Grid>
              {chosenSource.attributionLink && (
                <Grid item xs={6} container justify="flex-end">
                  <Button
                    className={classes.button}
                    size="medium"
                    color="primary"
                    onClick={() => goToUrl(chosenSource.attributionLink.link)}
                    disableRipple
                  >
                    {chosenSource.attributionLink.text}
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardActions>
        </>
      </Card>
    );
  },
);

SourceCard.propTypes = {
  chosenSource: PropTypes.shape(),
  changeSource: PropTypes.func.isRequired,
  isSingle: PropTypes.bool.isRequired,
  isLoadingOrError: PropTypes.bool.isRequired,
};

SourceCard.defaultProps = {
  chosenSource: null,
};

export default SourceCard;
