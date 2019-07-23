import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Fab, TextField, Button, MenuList, MenuItem, Avatar } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import moment from 'moment';
import cx from 'classnames';

import { tr } from 'utils/utils.js';
import styles from './styles.scss';
import CreateChat from './createChat';

export default class ChatList extends React.Component {
	componentDidMount = () => {
		const {
			chatList,
			getChatList,
			validateUser,
		} = this.props;

		if (!chatList || !chatList.length) {
			getChatList();
		}

		validateUser();
	}

	render() {
		const {
			chatList,
			match,
			location
		} = this.props;

		return (
			<div className={styles.chatList}>
				<div className={styles.chatGroup}>
					Public
				</div>

				<div className={styles.chatsContainer}>
					{chatList.map((chat, index) => {
						const messages = chat.messages;
						const lastMessage = messages[messages.length - 1];

						return (
							<NavLink
								key={index}
								className={cx(
									styles.link,
									{ [styles.activeLink]: location.pathname === (match.path + chat._id)},
								)}
								to={match.path + chat._id}
							>	
								<Avatar>{chat.name.charAt(0)}</Avatar>
								<div className={styles.chatInfo}>
									<div className={styles.nameAndDate}>
										<div className={styles.chatName}>{chat.name}</div>
										{lastMessage &&
											<div>{moment(lastMessage.sendTime).format('DD.MM')}</div>
										}
									</div>
									{lastMessage &&
										<div className={styles.lastMessage}>
											<div>{tr(lastMessage.author, 12) + ':'}</div>
											<div>{tr(lastMessage.text, 10)}</div>
										</div>
									}
								</div>
							</NavLink>
					)})}
				</div>		

				<CreateChat />
			</div>
		);
	}
}

ChatList.propTypes = {
	chatList: PropTypes.array.isRequired,
	// createChat: PropTypes.func.isRequired,
	// classes: PropTypes.shape({}),
	// match: PropTypes.shape({}),
};
