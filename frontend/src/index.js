import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './modules/App';
import Cookies from 'js-cookie';
import { BaseUrl } from 'api/api';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

import { Paper, Typography, TextField, Button } from '@material-ui/core/';

import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
  typography: {
    useNextVariants: true,
  },
});

class BakaClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getVal: '',
      postVal: '',
    };
  }

  sendFignyaGET = () => {
    let lastId = this.state.getVal;
    try {
      fetch(BaseUrl, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          type: 'get_messages',
          lastId: lastId,
          chatKey: 'TDa5LTBPjRpKS4c7GxOOr3-qyVj9EZ',
          debug: true,
        }),
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          let chatKey = res.response.body.chatKey;
        });
    } finally {
      this.setState({
        getVal: '',
        postVal: '',
      });
    }
  };

  sendFignyaPOST = () => {
    let text = this.state.postVal;
    try {
      fetch(BaseUrl, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          type: 'send',
          name: 'lolkaName',
          chatKey: 'TDa5LTBPjRpKS4c7GxOOr3-qyVj9EZ', //TDa5LTBPjRpKS4c7GxOOr3-qyVj9EZ (initial) ----    xHyfLTU7giMi77_EwGnAhwVduVDhUB -----
          text: text,
        }),
      }).then(res => {
        return res.json();
      });
    } finally {
      this.setState({
        getVal: '',
        postVal: '',
      });
    }
  };

  sendCreateChat = () => {
    try {
      fetch(BaseUrl, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          type: 'chat_create',
          chatName: 'AtlasChat',
        }),
      })
        .then(res => {
          return res.json();
        })
        .then(res => {});
    } finally {
      this.setState({
        getVal: '',
        postVal: '',
      });
    }
  };

  componentDidMount() {
    //window.handleClientLoad();
    fetch('http://localhost:8001');
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const styleForForm = { display: 'flex', alignItems: 'center' };
    return (
      <div style={{ display: 'flex' }}>
        <Paper style={{ display: 'flex', flexDirection: 'column' }}>
          <ul>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/123">123</Link>
            </li>
            <li>
              <Link to="/456">456</Link>
            </li>
            <li>
              <Link to="/789">789</Link>
            </li>
            <li>
              <Link to="/baki">baki</Link>
            </li>
          </ul>
        </Paper>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Controls
                styleForForm={styleForForm}
                getVal={this.state.getVal}
                postVal={this.state.postVal}
                handleChange={this.handleChange}
                sendFignyaGET={this.sendFignyaGET}
                sendFignyaPOST={this.sendFignyaPOST}
                sendCreateChat={this.sendCreateChat}
              />
            )}
          />
          <Route exact path="/:id" component={DialogText} />} />
          <Route render={() => <h3>Wrong URL, sorry c^:</h3>} />
        </Switch>
      </div>
    );
  }
}

const Controls = ({
  styleForForm,
  getVal,
  handleChange,
  sendFignyaGET,
  postVal,
  sendFignyaPOST,
  sendCreateChat,
}) => {
  return (
    <Paper>
      <form style={styleForForm}>
        <TextField
          name="getVal"
          label="Last id"
          value={getVal}
          onChange={handleChange}
          margin="normal"
          autoComplete="off"
        />
        <Button
          onClick={sendFignyaGET}
          color="primary"
          style={{ height: '100%', marginLeft: '40px' }}
          variant="contained"
        >
          Get messages after this id
        </Button>
      </form>
      <form style={styleForForm}>
        <TextField
          name="postVal"
          label="Post message"
          value={postVal}
          onChange={handleChange}
          margin="normal"
          autoComplete="off"
        />
        <Button
          className="button"
          onClick={sendFignyaPOST}
          color="primary"
          style={{ height: '100%', marginLeft: '40px' }}
          variant="contained"
        >
          Send new message
        </Button>
      </form>
      <Button onClick={sendCreateChat} color="primary" variant="contained">
        create new chat
      </Button>
      <Button
        onClick={window.handleAuthClick}
        color="primary"
        variant="contained"
      >
        Try auth
      </Button>
      <Button onClick={window.revokeAccess} color="primary" variant="contained">
        revoke access
      </Button>
    </Paper>
  );
};

const DialogText = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('root'),
);

//<Router>
// <BakaClass/>
//</Router>
//<Router>
//<Provider store={store}>
//  <MuiThemeProvider theme={theme}>
//    <App />
//    </MuiThemeProvider>
//  </Provider>
//</Router>
