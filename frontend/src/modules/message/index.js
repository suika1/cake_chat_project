import React from 'react';
import { Typography, ListItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import moment from 'moment';
import cx from 'classnames';
import { getId } from 'api/localStorage'

import styles from './styles.scss';

class Message extends React.PureComponent {
  render() {
    const { data } = this.props;
    const {
      sendTime,
      author: {
        name,
        _id,
      },
      text,
    } = data;

    const msgTime = moment(sendTime).format('HH:mm');

    return (
      <div className={cx(styles.wrapper, {[styles.right]: (_id === getId())})}>
        <Avatar>{name.charAt(0)}</Avatar>
        <div className={styles.message}>
          <div className={styles.name}>
            {name}
          </div>
          <div>
            {text}
          </div>
          <div className={styles.time}>
            {msgTime}
          </div>
        </div>
      </div>
    );
  }
}

// Message.propTypes = {
//   name: PropTypes.string.isRequired,
//   text: PropTypes.string.isRequired,
//   date: PropTypes.number.isRequired,
//   styles: PropTypes.shape({}),
// };

export default withStyles(styles)(Message);
