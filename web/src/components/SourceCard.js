import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { get } from 'axios';
import PropTypes from 'prop-types';

import SourceList from './SourceList';

const MEDIA_HEIGHT = 69;
const TITLE_HEIGHT = 35;
const ACTIONS_HEIGHT = 40;

const useStyles = makeStyles(theme => ({
  card: {
    height: '95%',
    width: '95%',
  },
  cardActionArea: {
    height: `calc(100% - ${ACTIONS_HEIGHT}px)`,
  },
  media: {
    minHeight: MEDIA_HEIGHT,
    height: '15%',
  },
  content: {
    '&&': {
      height: '100%',
      padding: '16px 16px 0 16px',
    },
  },
  contentTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 'calc(1vw + 1vh + .5vmin)',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 'calc(0.8vw + 0.8vh + .7vmin)',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4rem',
    },
  },
  contentList: {
    height: `calc(100% - ${TITLE_HEIGHT}px)`,
  },
  actions: {
    height: ACTIONS_HEIGHT,
  },
}));

const styles = {
  contentTitle: {
    height: TITLE_HEIGHT,
    margin: 0,
  },
};

const SourceCard = ({ chosenSource, name, changeSource }) => {
  const classes = useStyles(useTheme());
  const [sourceData, setSourceData] = useState(null);

  useEffect(() => {
    get(`${process.env.REACT_APP_API_URL}/sources/${chosenSource}`).then(
      ({ data }) => setSourceData(data),
    );
  }, []);

  return (
    <Card className={classes.card} raised>
      <CardActionArea className={classes.cardActionArea}>
        <CardMedia
          className={classes.media}
          title={name}
          image={`${process.env.REACT_APP_API_URL}/images/${chosenSource}`}
        />
        <CardContent classes={{ root: classes.content }}>
          <Typography
            style={styles.contentTitle}
            className={classes.contentTitle}
            gutterBottom
            component="h2"
          >
            {name}
          </Typography>
          {sourceData ? (
            <div className={classes.contentList}>
              <SourceList articles={sourceData.data} />
            </div>
          ) : (
            <Typography component="p">Loading...</Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button size="small" color="primary" onClick={changeSource}>
          Change Source
        </Button>
      </CardActions>
    </Card>
  );
};

SourceCard.propTypes = {
  chosenSource: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  changeSource: PropTypes.func.isRequired,
};

export default SourceCard;
