import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    overflow: 'scroll',
  },
  listItemText: {
    // add media queries
    [theme.breakpoints.down('sm')]: {
      fontSize: 'calc(0.vw + 0.6vh + .5vmin) !important',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 'calc(0.6vw + 0.6vh + .5vmin) !important',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1rem !important',
    },
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function SourceList({ articles }) {
  const classes = useStyles(useTheme());

  return (
    <div className={classes.root}>
      <List component="nav">
        {articles.map(article => (
          <div key={article.id}>
            <ListItemLink href={article.url}>
              <ListItemText
                primary={
                  <Typography className={classes.listItemText} variant="body2">
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
