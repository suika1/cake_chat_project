export default {
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