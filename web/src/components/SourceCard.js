import React, { useEffect, useRef, forwardRef } from 'react';
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

import { useGetFromUrl } from '../utils/hooks';

import SourceList from './SourceCardList';
import Loader from './Loader';

const MEDIA_HEIGHT = 69;
const TITLE_HEIGHT = 35;
const ACTIONS_HEIGHT = 50;

const useStyles = makeStyles(theme => ({
  root: {
    height: '95%',
    width: '95%',
    position: 'absolute',
    zIndex: 99,
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
  ({ chosenSource, changeSource, cardShown }, unusedRef) => {
    const classes = useStyles(useTheme());
    const cardRef = useRef(null);

    const handleClickOutside = e => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
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
    }, [cardShown]);

    const { data: sourceData, isLoading, isError } = useGetFromUrl(
      `${process.env.REACT_APP_API_URL}/sources/${chosenSource &&
        chosenSource.id}`,
      500,
    );

    return (
      <Card ref={cardRef} className={classes.root} raised>
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
                {!isLoading && !isError ? (
                  <>
                    <div className={classes.contentList}>
                      <SourceList articles={sourceData} />
                    </div>
                  </>
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
  cardShown: PropTypes.bool.isRequired,
};

SourceCard.defaultProps = {
  chosenSource: null,
};

export default SourceCard;
