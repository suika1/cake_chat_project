import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './styles.scss';

const ChatRename = ({ renameChat, chatName, chatId }) => {
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState(chatName)

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const editName = () => {
    setOpen(false)
    renameChat({ newName, chatId })
  }

  return (
    <>
      <div onClick={handleClickOpen} className={styles.chatName}>{chatName}</div>
      <Dialog className={styles.renameChatModal} open={open} onClose={handleClose}>
        <DialogTitle>Change chat name</DialogTitle>
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
          <Button className={styles.cancelBtn} onClick={handleClose}>Cancel</Button>
          <Button className={styles.renameBtn} onClick={editName}>Rename</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChatRename;
