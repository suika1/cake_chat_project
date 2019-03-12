import React from 'react';
import { Typography, ListItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';

const styles = theme => ({
  message: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  myMessage: {
    display: 'flex',
    flexDirection: 'column-reverse',
    textAlign: 'right',
    marginLeft: 'auto',
    '& > div:first-child': {
      marginLeft: 'auto',
      marginRight: '25px',
    },
    '& > div:last-child > p': {
      marginLeft: 'auto',
    },
  },
  messageHeader: {
    width: '100%',
    height: '40px',
  },
  messageMain: {
    marginLeft: '25px',
    position: 'relative',
    padding: '10px 20px',
    paddingRight: '40px',
    background: theme.palette.grey.A200,
    border: '10px solid ' + theme.palette.grey.A200,
    borderRadius: '30px',
  },
  name: {
    borderBottom: '1px solid grey',
    width: 'max-content',
  },
  text: {},
  date: {
    position: 'absolute',
    right: '0',
    bottom: '0',
  },
  '@media (max-width: 900px)': {
    myMessage: {
      '& > div:last-child > p': {
        position: 'relative',
        right: '30px',
      },
      '& > div:first-child': {
        marginRight: '0',
      },
    },
  },
});

class Message extends React.PureComponent {
  render() {
    let { name, text, date, classes } = this.props;
    let myDate = new Date(date * 1000);
    let hrs = ('0' + myDate.getHours()).substr(-2);
    let mins = ('0' + myDate.getMinutes()).substr(-2);
    //TODO:if it's current user (now mock)
    //TODO: avatar
    let myName = 'lolkaName';
    if (Cookies.get('name')) {
      myName = Cookies.get('name');
    }

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
};

export default withStyles(styles)(Message);
