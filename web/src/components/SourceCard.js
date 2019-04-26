import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import { returnPropIfTrue } from '../utils/obj';
import { useSourcesData } from '../context/sourcesDataContext';

import Loader from './Loader';

const LazySourceCardList = React.lazy(() => import('./SourceCardList'));

const MEDIA_HEIGHT = 69;
const TITLE_HEIGHT = 35;
const ACTIONS_HEIGHT = 50;

const useStyles = isSingle =>
  makeStyles(theme => ({
    root: {
      height: window.innerHeight - theme.header.headerHeightSmall - 30,
      [theme.header.minHeightMedia]: {
        height: window.innerHeight - theme.header.headerHeightLarge - 30,
      },
      maxWidth: theme.maxWidth - 20,
      margin: '15px 10px',
      position: 'absolute',
      width: window.innerWidth - 20,
      zIndex: 99,
      ...returnPropIfTrue(isSingle, { left: 0 }),
      ...returnPropIfTrue(isSingle, { top: 0 }),
    },
    cardActionArea: {
      height: `calc(100% - ${ACTIONS_HEIGHT}px)`,
      '&:hover $focusHighlight': {
        opacity: 0,
      },
    },
    focusHighlight: {},
    media: {
      height: '100%',
    },
    content: {
      '&&': {
        height: '100%',
        padding: '16px 16px 0 16px',
      },
    },
    contentTitle: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 'calc(1.2vw + 1.2vh + .5vmin)',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 'calc(1vw + 1vh + .7vmin)',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.5rem',
      },
    },
    contentList: {
      height: `calc(100% - ${ACTIONS_HEIGHT}px)`,
    },
  }));

const styles = {
  contentTitle: {
    height: TITLE_HEIGHT,
    padding: '10px 0 0 10px',
  },
  action: {
    height: `${ACTIONS_HEIGHT}px`,
    marginTop: `-${ACTIONS_HEIGHT}px`,
  },
};

const SourceCard = forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ chosenSource, changeSource, isSingle, isLoadingOrError }, unusedRef) => {
    const cardRef = useRef(null);
    const theme = useTheme();
    const classes = useStyles(isSingle)(theme);
    const [sourcesData] = useSourcesData();
    const [sourceData, setSourceData] = useState(null);

    const handleClickOutside = e => {
      const extraSpaceEitherSide = (window.innerWidth - theme.maxWidth) / 2;

      if (
        extraSpaceEitherSide > 0 &&
        (e.clientX < extraSpaceEitherSide ||
          e.clientX > theme.maxWidth + extraSpaceEitherSide)
      ) {
        changeSource();
      }
    };

    const handleCardMediaClick = () => {
      window.location = chosenSource.url;
    };

    useEffect(() => {
      document.addEventListener('click', handleClickOutside, false);
      return () => {
        document.removeEventListener('click', handleClickOutside, false);
      };
    }, []);

    useEffect(() => {
      if (!isLoadingOrError) {
        setSourceData(
          sourcesData.find(source => source.id === chosenSource.id).data,
        );
      }
    }, [isLoadingOrError]);

    return (
      <Card ref={cardRef} className={classes.root}>
        <>
          <Box height="100%">
            <CardActionArea
              classes={{
                root: classes.cardActionArea,
                focusHighlight: classes.focusHighlight,
              }}
              disableTouchRipple
            >
              <Box height="15%" minHeight={`${MEDIA_HEIGHT}px`}>
                <CardMedia
                  className={classes.media}
                  onClick={handleCardMediaClick}
                  title={chosenSource.name}
                  image={`${process.env.REACT_APP_API_URL}/images/${
                    chosenSource.id
                  }`}
                />
              </Box>
              <Box height="85%">
                <Typography
                  style={styles.contentTitle}
                  className={classes.contentTitle}
                  component="h2"
                >
                  {chosenSource.name}
                </Typography>
                {sourceData ? (
                  <Suspense fallback={<Loader />}>
                    <div className={classes.contentList}>
                      <LazySourceCardList articles={sourceData} />
                    </div>
                  </Suspense>
                ) : (
                  <Loader />
                )}
              </Box>
            </CardActionArea>
          </Box>
          <CardActions style={styles.action}>
            <Grid container spacing={0} justify="flex-start">
              <Grid item xs={6}>
                <Button size="medium" color="primary" onClick={changeSource}>
                  Change Source
                </Button>
              </Grid>
              {chosenSource.attributionLink && (
                <Grid item xs={6}>
                  <Link href={chosenSource.attributionLink.link}>
                    {chosenSource.attributionLink.text}
                  </Link>
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
