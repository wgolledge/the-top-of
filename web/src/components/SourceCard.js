import React, { Suspense, useEffect, useState, forwardRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import { returnPropIfTrue } from '../utils/obj';
import { useSourcesData } from '../context/sourcesDataContext';

import Loader from './Loader';

const LazySourceCardList = React.lazy(() => import('./SourceCardList'));

const MEDIA_HEIGHT = 65;
const MEDIA_MAX_HEIGHT = 95;
const TITLE_HEIGHT = 30;
const ACTIONS_HEIGHT = 45;

const useStyles = isSingle =>
  makeStyles(theme => ({
    root: {
      color: theme.palette.type === 'dark' ? '#fff' : '#000',
      height: window.innerHeight - theme.header.headerHeightSmall - 30,
      [theme.header.minHeightMedia]: {
        height: window.innerHeight - theme.header.headerHeightLarge - 30,
      },
      maxWidth: theme.maxWidth - 20,
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
    media: {
      cursor: 'pointer',
      height: MEDIA_HEIGHT,
      [theme.breakpoints.up('sm')]: {
        height: MEDIA_MAX_HEIGHT,
      },
    },
    content: {
      height: `calc(100% - ${MEDIA_HEIGHT}px)`,
      [theme.breakpoints.up('sm')]: {
        height: `calc(100% - ${MEDIA_MAX_HEIGHT}px)`,
      },
    },
    contentTitle: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 'calc(1.2vw + 1.3vh + .5vmin)',
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
    marginTop: `-${ACTIONS_HEIGHT + 5}px`,
  },
};

const goToUrl = url => {
  window.location = url;
};

const SourceCard = forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ chosenSource, changeSource, isSingle, isLoadingOrError }, ref) => {
    const theme = useTheme();
    const classes = useStyles(isSingle)(theme);
    const [sourcesData] = useSourcesData();
    const [sourceData, setSourceData] = useState(null);

    const handleCardMediaClick = () => {
      window.location = chosenSource.url;
    };

    useEffect(() => {
      const handleClickOutside = e => {
        const extraSpaceEitherSide = (window.innerWidth - theme.maxWidth) / 2;

        if (
          extraSpaceEitherSide > 0 &&
          e.clientY > 64 &&
          (e.clientX < extraSpaceEitherSide ||
            e.clientX > theme.maxWidth + extraSpaceEitherSide)
        ) {
          changeSource();
        }
      };

      document.addEventListener('click', handleClickOutside, false);
      return () => {
        document.removeEventListener('click', handleClickOutside, false);
      };
    }, [changeSource, theme.maxWidth]);

    useEffect(() => {
      if (!isLoadingOrError) {
        setSourceData(
          sourcesData.find(source => source.id === chosenSource.id).data,
        );
      }
    }, [isLoadingOrError, chosenSource.id, sourcesData]);

    return (
      <Card ref={ref} className={classes.root}>
        <>
          <Box height="100%">
            <CardActionArea
              classes={{
                root: classes.cardActionArea,
                focusHighlight: classes.focusHighlight,
              }}
              disableTouchRipple
            >
              <CardMedia
                className={classes.media}
                onClick={handleCardMediaClick}
                title={chosenSource.name}
                image={`${process.env.REACT_APP_API_URL}/images/${
                  chosenSource.id
                }`}
              />
              <div className={classes.content}>
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
              </div>
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
                <Grid item xs={6} container justify="flex-end">
                  <Button
                    size="medium"
                    color="primary"
                    onClick={() => goToUrl(chosenSource.attributionLink.link)}
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
