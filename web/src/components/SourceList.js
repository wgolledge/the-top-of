import React from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    overflow: 'scroll',
  },
  listItemText: {
    fontSize: '0.5em',
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function SourceList({ articles }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav">
        {articles.map(article => (
          <ListItemLink href={article.url} key={article.id}>
            <ListItemText
              primary={<Typography variant="h8">{article.title}</Typography>}
            />
          </ListItemLink>
        ))}
      </List>
    </div>
  );
}

SourceList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SourceList;
