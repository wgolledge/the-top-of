import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  introText: {
    fontSize: '1.2em',
    fontWeight: 500,
    letterSpacing: 1.3,
    marginBottom: 50,
  },
  paper: {
    margin: '20px',
  },
  listItem: {
    cursor: 'pointer',
    justifyContent: 'center',
    padding: 5,
  },
  sourceText: {
    fontSize: '1.6em',
    fontWeight: 500,
  },
});

const SourceList = ({ sources, onClick }) => {
  const classes = useStyles();

  return (
    <List disablePadding>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Typography
            className={classes.introText}
            variant="body2"
            color="secondary"
            align="center"
          >
            Choose which source you would like to see!
          </Typography>
        </Grid>
        {sources.map(source => (
          <Grid item key={source.id} xs={12} md={10} lg={6}>
            <Paper className={classes.paper} elevation={2}>
              <ListItem
                className={classes.listItem}
                button
                component="button"
                onClick={() => onClick(source)}
              >
                <Typography
                  className={classes.sourceText}
                  variant="body2"
                  color="primary"
                >
                  {source.name}
                </Typography>
              </ListItem>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </List>
  );
};

SourceList.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SourceList;
