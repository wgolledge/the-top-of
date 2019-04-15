import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
// import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    overflow: 'scroll',
  },
  list: {
    '&&': {
      [theme.breakpoints.down('sm')]: {
        paddingTop: 0,
      },
    },
  },
  listItemText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 'calc(0.7vw + 0.7vh + .5vmin)',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 'calc(0.6vw + 0.6vh + .5vmin)',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1rem',
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
      <List component="nav" className={classes.list}>
        {articles.map(article => (
          <div key={article.id}>
            <ListItemLink href={article.url}>
              <ListItemText
                primary={article.title}
                className={classes.listItemText}
                disableTypography
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
