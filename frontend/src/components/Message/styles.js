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

export default styles;