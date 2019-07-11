import React from 'react';
import PropTypes from 'prop-types';
//import { Delete } from '@material-ui/icons'

import styles from './styles.scss';
import { SvgIcon, Button } from '@material-ui/core';

export default ({ deleteChat, chatId }) => (
  // <SvgIcon onClick={() => deleteChat({ chatId })}>
  //   {Delete}
  // </SvgIcon>
  <Button onClick={() => deleteChat({ chatId })}>
    Delete
  </Button>
)