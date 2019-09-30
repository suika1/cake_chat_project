import React from 'react';

import styles from './styles.scss';

export default class MessageActions extends React.Component {
  render() {
    const {
      chatId,
      selectedMessages,
    } = this.props;

    return (
      <div className={styles.headMenu}>
        {selectedMessages.length > 0 && (

        )}
        {selectedMessages.length === 1
        && selectedMessages[0].authorId === }
        <Button onClick={() => {}}>
          EDIT
        </Button>
      </div>
    )
  }
}
