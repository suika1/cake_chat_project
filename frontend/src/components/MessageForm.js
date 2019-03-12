import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Fab, Paper } from '@material-ui/core';
import Scroll from 'react-scroll';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';

const styles = {
  messageForm: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    margin: '0 auto',
    border: '5px solid white',
    borderRadius: '10px',
    width: '70%',
    maxWidth: '820px',
    display: 'flex',
  },
  btn: {
    fontSize: '20px',
  },
  text: {
    width: 'calc(80% - 62px)',
    marginLeft: '4px',
  },
  name: {
    width: '20%',
  },
  '@media (max-width: 900px)': {
    messageForm: {
      width: '95%',
    },
  },
};

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
    this.props.postMessage(
      this.state.textValue,
      this.state.nameValue,
      this.props.match.params.chatKey,
      this.props.lastId,
    );
    this.setState(
      {
        textValue: '',
      },
      () => {
        //update cookie for name if needed
        if (Cookies.get('name') !== this.state.nameValue)
          Cookies.set('name', this.state.nameValue, { expires: 1000 });
        this.props.onSend();
      },
    );
  };

  render() {
    return (
      <Paper className={this.props.classes.messageForm}>
        <TextField
          className={this.props.classes.name}
          label="Имя"
          id="form-name"
          onChange={this.onChange('nameValue')}
          value={this.state.nameValue}
          variant="standard"
        />
        <TextField
          className={this.props.classes.text}
          placeholder="Введите текст"
          multiline
          label="Текст"
          id="form-text"
          onChange={this.onChange('textValue')}
          value={this.state.textValue}
          variant="standard"
        />
        <Fab
          className={this.props.classes.btn}
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
};

export default withStyles(styles)(MessageForm);
