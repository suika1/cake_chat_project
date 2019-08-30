import React from 'react';
import { Button } from '@material-ui/core';

export default ({ focusOnForm, selectedMessages ,chatId, messageId, text }) => {

  if (selectedMessages.length === 1) {
    return (
      <Button onClick={() => focusOnForm()}>
        {`EDIT`}
      </Button>
    )
  } else return null;
}