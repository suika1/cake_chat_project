export default {
  chat: {
    position: 'relative',
    width: '70%',
    padding: '20px',
    margin: '15px 0',
    left: '20%',
  },
  messageList: {
    margin: '50px auto',
    width: '70%',
    maxWidth: '800px',
  },
  topFab: {
    position: 'fixed',
    bottom: '140px',
    right: '10%',
  },
  chatKeyInput: {
    width: '60%',
  },
  botFab: {
    position: 'fixed',
    bottom: '70px',
    right: '10%',
  },
  '@media (max-width: 1200px)': {
    chat: {
      left: '25%',
    },
  },
  '@media (max-width: 900px)': {
    chat: {
      textAlign: 'center',
      margin: '0',
      width: '100%',
      left: '0',
    },
    messageList: {
      width: '95%',
      paddingRight: '50px',
    },
    chatKeyInput: {
      width: '100%',
    },
    topFab: {
      right: '5px',
    },
    botFab: {
      right: '5px',
    },
    chatLinkBlock: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > * + *': {
        marginTop: '10px',
      },
    },
  },
};