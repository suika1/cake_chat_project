import React from 'react';
import { Typography, ListItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import styles from './styles.scss';

class Message extends React.PureComponent {
  render() {
    const { data } = this.props;
    const {
      sendTime,
      author,
      text,
    } = data;

    const msgTime = moment(sendTime).format('HH:mm');

    return (
      <ListItem className={styles.myMessage}>
        <div className={styles.messageMain}>
          <Typography className={styles.text} variant="body2">
            {text}
          </Typography>
          <Typography className={styles.date} variant="caption">
            {msgTime}
          </Typography>
        </div>
        <div className={styles.messageHeader}>
          <Typography className={styles.name} variant="body1">
            {author}
          </Typography>
        </div>
      </ListItem>
    );
  }
}

Message.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  styles: PropTypes.shape({}),
};

export default withStyles(styles)(Message);
