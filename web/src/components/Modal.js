import React, { useState, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { get } from 'axios';

import Button from './Button';
import SourceCard from './SourceCard';

const theme = createMuiTheme();

const useStyles = makeStyles({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: '50%',
    left: '50%',
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const SimpleModal = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [sources, setSources] = useState(null);
  const [chosenSource, setChosenSource] = useState(null);

  useEffect(() => {
    get('/sources').then(({ data }) => setSources(data));
  }, []);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleSelectSource = source => {
    setModalOpen(false);
    setChosenSource(source);
  };

  return (
    <div>
      {chosenSource && !modalOpen ? (
        <SourceCard
          chosenSource={chosenSource.id}
          name={chosenSource.name}
          changeSource={handleOpen}
        />
      ) : (
        <Button onClick={handleOpen} text="... THE TOP OF">
          Open Modal
        </Button>
      )}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={modalOpen}
        onClose={handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
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
                onClick={() => handleSelectSource(source)}
              />
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default SimpleModal;
