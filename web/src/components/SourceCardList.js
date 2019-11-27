import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.type === 'dark' ? '#fff' : '#000',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  list: {
    '&&': {
      [theme.breakpoints.down('sm')]: {
        paddingTop: 0,
      },
    },
  },
  listButton: {
    padding: '10px 12px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '@media (hover: none)': {
      // Override hover color
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  listItemNumber: {
    minWidth: 25,
  },
  listItemText: {
    marginRight: 10,
    paddingLeft: 5,
    [theme.breakpoints.down('sm')]: {
      fontSize: 'calc(0.7vw + 1vh + .5vmin)',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 'calc(0.6vw + 0.7vh + .5vmin)',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1em',
    },
  },
  avatar: {
    height: 45,
    margin: '-7px 0 -7px -7px',
    width: 45,
  },
}));

const ListItemLink = props => (
  <ListItem button component="a" disableTouchRipple {...props} />
);

const SourceList = ({ articles }) => {
  const classes = useStyles(useTheme());

  return (
    <div className={classes.root}>
      <List component="nav" className={classes.list}>
        {articles.map(article => (
          <div key={article.id}>
            <ListItemLink
              href={article.url}
              classes={{ root: classes.listButton }}
            >
              <div className={classes.listItemNumber}>
                <Typography variant="h6" component="span">
                  {article.id + 1}
                </Typography>
              </div>
              <ListItemText
                className={classes.listItemText}
                primary={article.title}
                disableTypography
              />
              {article.thumbnail && (
                <Avatar
                  className={classes.avatar}
                  alt={`Thumbnail for ${article.title}`}
                  src={article.thumbnail}
                />
              )}
            </ListItemLink>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

SourceList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SourceList;
