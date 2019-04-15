import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  paper: {
    margin: '20px',
  },
  listItem: {
    cursor: 'pointer',
    justifyContent: 'center',
  },
  introText: {
    fontSize: '1em',
    marginBottom: 50,
  },
  sourceText: {
    fontSize: '1rem',
  },
});

const SourceList = ({ sources, onClick }) => {
  const classes = useStyles();

  return (
    <List disablePadding>
      <Grid container spacing={2} justify="center">
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
