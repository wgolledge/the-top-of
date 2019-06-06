import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    maxHeight: props => props.sourceCount * 100 + 100,
    overflowY: 'scroll',
  },
  introText: {
    fontSize: '1.2em',
    fontWeight: 500,
    letterSpacing: 1.3,
    margin: 'auto',
    width: '95%',
  },
  paper: {
    margin: '25px',
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
  const classes = useStyles({ sourceCount: sources.length });

  return (
    <List className={classes.root} disablePadding>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Typography
            className={classes.introText}
            variant="body2"
            color="secondary"
            align="center"
          >
            Choose a source{' '}
            <span role="img" aria-label="smiling face">
              🙂
            </span>
          </Typography>
        </Grid>
        {sources.map(source => (
          <Grid item key={source.id} xs={12} md={6} lg={6}>
            <Paper className={classes.paper} elevation={2}>
              <ListItem
                className={classes.listItem}
                disableRipple
                button
                component="button"
                onClick={() => onClick(source)}
                classes={{ button: classes.buttonClass }}
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
