import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { get } from 'axios';

import Button from './Button';
import SourceCard from './SourceCard';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  },
}));

const SimpleModal = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [sources, setSources] = useState(null);
  const [chosenSource, setChosenSource] = useState(null);

  useEffect(() => {
    get(`${process.env.REACT_APP_API_URL}/sources`).then(({ data }) =>
      setSources(data),
    );
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
        <Button onClick={handleOpen} text="... THE TOP OF" />
      )}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={modalOpen}
        onClose={handleClose}
      >
        <div className={classes.root}>
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
