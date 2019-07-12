import React from 'react';
import { Button } from '@material-ui/core';

export default ({ deleteChat, chatId }) => (
  <Button onClick={() => deleteChat({ chatId })}>
    Delete
  </Button>
)