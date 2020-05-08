import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const ListRoot = styled(({ sourceCount, listRef, ...rest }) => (
  <List ref={listRef} {...rest} />
))`
  display: flex;
  align-items: center;
  height: 100%;
  max-height: ${p => p.sourceCount * 100 + 100};
  overflow-y: auto;
`;

const Intro = styled(Typography)`
  font-size: '1.2rem';
  font-weight: 500;
  letter-spacing: 1.3;
  margin: 'auto';
  width: '95%';
`;

const ListContent = styled(Paper)`
  margin: 25px;
`;

const ListItem = styled(MuiListItem)`
  cursor: pointer;
  justify-content: center;
  padding: 5px;
`;

const SourceText = styled(Typography)`
  font-size: 1.1rem;
  font-weight: 500;
`;

const SourceList = forwardRef(({ sources, onClick }, ref) => (
  <ListRoot listRef={ref} disablePadding sourceCount={sources.length}>
    <Grid container justify="center">
      <Grid item xs={12}>
        <Intro variant="body2" color="secondary" align="center">
          Choose a source{' '}
          <span role="img" aria-label="smiling face">
            🙂
          </span>
        </Intro>
      </Grid>
      {sources.map(source => (
        <Grid item key={source.id} xs={12} md={6} lg={6}>
          <ListContent elevation={2}>
            <ListItem
              disableRipple
              button
              component="button"
              onClick={() => onClick(source)}
            >
              <SourceText variant="body2" color="primary">
                {source.name}
              </SourceText>
            </ListItem>
          </ListContent>
        </Grid>
      ))}
    </Grid>
  </ListRoot>
));

SourceList.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SourceList;
