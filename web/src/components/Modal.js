import React, { useState, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { get } from 'axios';
import PropTypes from 'prop-types';

import Button from './Button';

const theme = createMuiTheme();

const useStyles = makeStyles({
  paper: {
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    outline: 'none',
  },
});

const getModalStyle = () => ({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
});

const SimpleModal = ({ isOpen, setChosenSource, onClose }) => {
  const classes = useStyles();
  const [sources, setSources] = useState(null);

  useEffect(() => {
    get(`${process.env.REACT_APP_API_URL}/sources`).then(({ data }) =>
      setSources(data),
    );
  }, []);

  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disablePortal
        BackdropProps={{ classes: classes.backdrop }}
        open={isOpen}
        onClose={onClose}
        style={getModalStyle()}
      >
        <div className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            Available news sources
          </Typography>
          <Typography variant="subtitle1" id="modal-description">
            Choose which news source you would like to see
          </Typography>
          {sources &&
            sources.map(source => (
              <Button
                key={source.id}
                text={source.name}
                onClick={() => setChosenSource(source)}
              />
            ))}
        </div>
      </Modal>
    </div>
  );
};

SimpleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setChosenSource: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SimpleModal;
