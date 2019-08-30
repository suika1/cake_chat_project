import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import moment from 'moment';
import cx from 'classnames';
import { getId } from 'api/localStorage'

import styles from './styles.scss';

class Message extends React.PureComponent {
  state = {selected: false}
  messageRef = React.createRef();

  selectMessageHandler = () => {
    const {
      text,
      _id,
    } = this.props.data
    const { chatId, selectMessage, unselectMessage } = this.props

    if (this.state.selected) {
      this.messageRef.current.classList.remove(styles.selected)
      unselectMessage({ chatId, messageId: _id})
      this.setState({selected: false})
    } else {
      this.messageRef.current.classList.add(styles.selected)
      selectMessage({ chatId, messageId: _id, text})
      this.setState({selected: true})
    }
  }

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
    const isOwn = _id === getId();

    return (
      <div 
        className={cx(styles.wrapper, 
          {[styles.right]: (isOwn)})
        }
        onClick={this.selectMessageHandler}
        ref={this.messageRef}
      >
        {!isOwn && <Avatar>{name.charAt(0)}</Avatar>}
        <div className={styles.message}>
          {!isOwn &&
            <div className={styles.name}>
              {name}
            </div>
          }
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
