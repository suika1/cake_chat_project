import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';

import s from './styles.scss';

export default ({ deleteChat, chatId }) => {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const closeModal = () => setIsConfirmDeleteModalOpen(false);
  const openModal = () => setIsConfirmDeleteModalOpen(true);

  return (
    <>
      <Dialog className={s.deleteChatModal} open={isConfirmDeleteModalOpen} onClose={closeModal}>
        <DialogTitle>Confirm chat deletion</DialogTitle>
        <DialogActions>
          <Button className={s.cancelBtn} onClick={closeModal}>
            Cancel
          </Button>
          <Button
            className={s.deleteBtn}
            onClick={() => {
              deleteChat({ chatId });
              closeModal();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Button onClick={openModal}>
        Delete
      </Button>
    </>
  )
}
