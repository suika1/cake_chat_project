import React from 'react';
import { Button } from '@material-ui/core';

export default ({ deleteMessage, chatId, selectedMessages }) => (
  <Button onClick={() => deleteMessage({ chatId, selectedMessages })}>
    {`DELETE ${selectedMessages.length}`}
  </Button>
)