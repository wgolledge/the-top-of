import React, { useState } from 'react';

import Modal from './Modal';
import SourceCard from './SourceCard';
import Button from './Button';

const Body = () => {
  const [chosenSource, setChosenSource] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChangeSource = () => {
    setChosenSource(null);
    setModalOpen(true);
  };

  const handleSetChosenSource = source => {
    setChosenSource(source);
    setModalOpen(false);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Modal
        isOpen={modalOpen}
        setChosenSource={handleSetChosenSource}
        onClose={closeModal}
      />
      {chosenSource ? (
        <SourceCard
          chosenSource={chosenSource.id}
          name={chosenSource.name}
          changeSource={handleChangeSource}
        />
      ) : (
        <Button onClick={openModal} text="... THE TOP OF" />
      )}
    </>
  );
};

export default Body;
