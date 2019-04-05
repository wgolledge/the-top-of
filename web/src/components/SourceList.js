import React from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    overflow: 'scroll',
  },
});

const styles = {
  listItemText: {
    // add media queries
    fontSize: 'calc(0.6vw + 0.6vh + .5vmin)',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  },
};

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function SourceList({ articles }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav">
        {articles.map(article => (
          <div key={article.id}>
            <ListItemLink href={article.url}>
              <ListItemText
                className={classes.listItemText}
                primary={
                  <Typography style={styles.listItemText} variant="body2">
                    {article.title}
                  </Typography>
                }
              />
            </ListItemLink>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

SourceList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SourceList;
