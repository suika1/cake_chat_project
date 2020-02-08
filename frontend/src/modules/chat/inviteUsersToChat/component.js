import React from 'react';

import {
  Button,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  Chip,
} from '@material-ui/core';
import { usePrevious } from 'hooks/usePrevious';

import s from './styles.scss';

const InviteUsersToChat = (props) => {
  const {
    allUsers,
    findAllUsersNotPresentedInChat,
    inviteUsersToChat,
    chatId,
    inviteRequest,
  } = props;

  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  const prevProps = usePrevious(props);

  React.useEffect(() => {
    if (isConfirmModalOpen) {
      findAllUsersNotPresentedInChat({
        chatId,
      });
    }
  }, [isConfirmModalOpen]);

  React.useEffect(() => {
    if (
      prevProps
      && prevProps.inviteRequest
      && prevProps.inviteRequest.isFetching
      && !inviteRequest.isFetching
      && !inviteRequest.errorMessage
    ) {
      setSelectedUsers([]);
      setIsConfirmModalOpen(false);
    }
  }, [inviteRequest.isFetching]);

  const handleSelectedUsersChange = e => {
    setSelectedUsers(e.target.value);
  }

  return (
    <>
      <Button onClick={() => setIsConfirmModalOpen(true)} styles={s.inviteBtn}>
        INVITE
      </Button>
      <Dialog
        PaperProps={{
          className: s.renameChatModal,
        }}
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <DialogTitle>Invite users to chat</DialogTitle>
        <DialogContent>
          <Select
            multiple
            value={selectedUsers}
            onChange={handleSelectedUsersChange}
            input={<Input />}
            renderValue={selected => (
              <div className={s.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value.name} className={s.chip} />
                ))}
              </div>
            )}
            className={s.select}
            MenuProps={{
              className: s.selectMenu,
            }}
          >
            {allUsers.map(user => (
              <MenuItem key={user.id} value={user}>
                {`${user.email} (${user.name})`}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            className={s.cancelBtn}
            onClick={() => setIsConfirmModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className={s.inviteConfirmBtn}
            onClick={() => inviteUsersToChat({
              userIds: selectedUsers.map(a => a._id),
              chatId,
            })}
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default InviteUsersToChat;
