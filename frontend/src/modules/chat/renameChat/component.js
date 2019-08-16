import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './styles.scss';

export default function ChatRename({renameChat, chatName, chatId}) {
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState(chatName)

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function editName() {
    setOpen(false)
    renameChat({ newName, chatId })
  }
  
  return (
    <>
      <div onClick={handleClickOpen} className={styles.chatName}>{chatName}</div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Изменить имя чата</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(event) => setNewName(event.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label={chatName}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={editName}>Изменить</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}