import React from 'react';
import { Typography, ListItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';

import styles from './styles.scss';

class Message extends React.PureComponent {
  render() {
    if (this.props.name === myName) {
      return (
        <ListItem className={classes.myMessage}>
          <div className={classes.messageMain}>
            <Typography className={classes.text} variant="body2">
              {text}
            </Typography>
            <Typography className={classes.date} variant="caption">
              {hrs}:{mins}
            </Typography>
          </div>
          <div className={classes.messageHeader}>
            <Typography className={classes.name} variant="body1">
              {name}
            </Typography>
          </div>
        </ListItem>
      );
    } else {
      return (
        <ListItem className={classes.message}>
          <div className={classes.messageHeader}>
            <Typography className={classes.name} variant="body1">
              {name}
            </Typography>
          </div>
          <div className={classes.messageMain}>
            <Typography className={classes.text} variant="body2">
              {text}
            </Typography>
            <Typography className={classes.date} variant="caption">
              {hrs}:{mins}
            </Typography>
          </div>
        </ListItem>
      );
    }
  }
}

Message.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  classes: PropTypes.shape({}),
};

export default withStyles(styles)(Message);
