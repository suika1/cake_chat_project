export default {
  chats: {
    position: 'fixed',
    display: 'flex',
    width: '240px',
    flexDirection: 'column',
    height: 'max-content',
    alignItems: 'center',
    '& > * + *': {
      marginTop: '10px',
    },
  },
  header: {
    fontSize: '24px',
    color: '#430e7be8',
  },
  chat: {
    width: '150px',
    height: '50px',
    paddingTop: '15px',
    boxShadow: 'inset 0px 0px 13px 1px grey',
    textDecoration: 'none',
    '&:hover': {
      boxShadow: 'inset 0px 0px 13px 3px #24358c',
    },
  },
  link: {
    fontSize: '12px',
    wordWrap: 'break-word',
  },
  activeChat: {
    //boxShadow: 'inset 0px 0px 13px 3px #24358c',
    backgroundColor: '#9c04fb52',
  },
  chatCreatorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'slide-up 0.4s ease',
  },
  chatNameInput: {
    width: 'calc(100% - 40px)',
  },
  chatCreateBtn: {
    top: '10px',
  },
  '@keyframes slide-up': {
    '0%': {
      opacity: '0',
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: '1',
      transform: 'translateY(0)',
    },
  },
  '@media (max-width: 900px)': {
    chats: {
      position: 'relative',
    },
  },
};