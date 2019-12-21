import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';

import history from 'api/browserHistory.js';
import { logoutUser } from 'api/localStorage';

import s from './styles.scss';

const LogoutBtn = () => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleClose = () => setConfirmModalOpen(false);

  return (
    <>
      <Dialog
        open={isConfirmModalOpen}
        onClose={handleClose}
      >
        <DialogTitle>
          Do you really want to logout?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} className={s.cancelBtn}>
            CANCEL
          </Button>
          <Button
            className={s.confirmLogoutBtn}
            onClick={() => {
              logoutUser();
              history.push('/login');
            }}
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        className={s.logoutBtn}
        onClick={() => setConfirmModalOpen(true)}
      >
        Logout
      </Button>
    </>
  )
};

export default LogoutBtn;
