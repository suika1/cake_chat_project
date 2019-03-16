import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { withRouter } from 'react-router';

import { TextField, Fab, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Cookies from 'js-cookie';

import { postMessages } from 'actions/messages/thunks';

import styles from './styles';

class MessageForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: this.initCookies(),
      textValue: '',
    };
  }

  //set initial cookie for name
  initCookies = () => {
    if (!Cookies.get('name')) Cookies.set('name', 'Имя', { expires: 1000 });
    return Cookies.get('name');
  };

  //For controlling inputs
  onChange = fieldName => e => this.setState({ [fieldName]: e.target.value });

  //When send btn clicked
  onSend = () => {
    const {
      postMessage,
      match,
      lastId,
      onSend,
    } = this.props;

    const {
      textValue,
      nameValue,
    } = this.state;

    postMessage(
      textValue,
      nameValue,
      match.params.chatKey,
      lastId,
    );

    this.setState(
      {
        textValue: '',
      },
      () => {
        //update cookie for name if needed
        if (Cookies.get('name') !== nameValue)
          Cookies.set('name', nameValue, { expires: 1000 });
        onSend();
      },
    );
  };

  render() {
    const {
      classes,
    } = this.props;

    const {
      nameValue,
      textValue,
    } = this.state;

    return (
      <Paper className={classes.messageForm}>
        <TextField
          className={classes.name}
          label="Имя"
          id="form-name"
          onChange={this.onChange('nameValue')}
          value={nameValue}
          variant="standard"
        />
        <TextField
          className={classes.text}
          placeholder="Введите текст"
          multiline
          label="Текст"
          id="form-text"
          onChange={this.onChange('textValue')}
          value={textValue}
          variant="standard"
        />
        <Fab
          className={classes.btn}
          color="primary"
          onClick={this.onSend}
        >
          >
        </Fab>
      </Paper>
    );
  }
}

MessageForm.propTypes = {
  postMessage: PropTypes.func.isRequired,
  match: PropTypes.shape({}),
  lastId: PropTypes.number,
  onSend: PropTypes.func.isRequired,
  classes: PropTypes.shape({}),
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: (text, name, chatKey, penultimateId) => {
      dispatch(postMessages(text, name, chatKey, penultimateId));
    },
  };
};

export default withStyles(styles)(
  withRouter(
    connect(
      null,
      mapDispatchToProps
    )(MessageForm)
  )
);
