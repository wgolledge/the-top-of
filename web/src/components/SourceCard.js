import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
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
const ACTIONS_HEIGHT = 40;

const useStyles = makeStyles({
  card: {
    height: '95%',
    width: '95%',
  },
  cardActionArea: {
    height: `calc(100% - ${ACTIONS_HEIGHT}px)`,
  },
  media: {
    height: MEDIA_HEIGHT,
  },
  content: {
    height: `calc(100% - ${MEDIA_HEIGHT}px)`,
    boxSizing: 'border-box',
    padding: '16px 16px 0 16px !important',
  },
  contentTitle: {
    height: ACTIONS_HEIGHT,
    margin: '0 !important',
  },
  contentList: {
    height: `calc(100% - ${ACTIONS_HEIGHT}px)`,
  },
  actions: {
    height: ACTIONS_HEIGHT,
  },
});

const SourceCard = ({ chosenSource, name, changeSource }) => {
  const classes = useStyles();
  const [sourceData, setSourceData] = useState(null);

  useEffect(() => {
    get(`${process.env.REACT_APP_API_URL}/sources/${chosenSource}`).then(
      ({ data }) => setSourceData(data),
    );
  }, []);

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardActionArea}>
        <CardMedia
          className={classes.media}
          title={name}
          image={`${process.env.REACT_APP_API_URL}/images/${chosenSource}`}
        />
        <CardContent className={classes.content}>
          <Typography
            className={classes.contentTitle}
            gutterBottom
            variant="h5"
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
