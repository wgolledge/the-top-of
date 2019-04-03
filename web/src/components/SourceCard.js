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

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 69,
  },
});

const SourceCard = ({ chosenSource, name, changeSource }) => {
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
          title={name}
          image={`${process.env.REACT_APP_API_URL}images/${chosenSource}`}
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
