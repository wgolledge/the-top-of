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

import hackerNewsImg from '../static/images/hackerNews.png';

import SourceList from './SourceList';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 70,
  },
});

const SourceCard = ({ chosenSource, name }) => {
  const classes = useStyles();
  const [sourceData, setSourceData] = useState(null);

  useEffect(() => {
    get(`sources/${chosenSource}`).then(({ data }) => setSourceData(data));
  }, []);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={hackerNewsImg}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          {sourceData ? (
            <SourceList articles={sourceData.data} />
          ) : (
            <Typography component="p">Loading...</Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Change Source
        </Button>
      </CardActions>
    </Card>
  );
};

SourceCard.propTypes = {
  chosenSource: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default SourceCard;
