import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from "./store/store";
import App from './containers/App';
import Cookies from 'js-cookie'
import { IP } from './actions/MessageActions';
import { MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles'
import { deepPurple } from '@material-ui/core/colors'

import {
    Paper,
    Typography,
    TextField,
    Button,
} from '@material-ui/core/';

import './index.css';

const theme = createMuiTheme({
    palette: {
        primary: deepPurple
    },
    typography: {
        useNextVariants: true,
    },
});

class BakaClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            getVal: '',
            postVal: ''
        }
    }

    sendFignyaGET = () => {
        let lastId = this.state.getVal;
        console.log(`try to get`);
        try {
            fetch(IP,
                {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        type: 'get_messages',
                        lastId: lastId,
                        chatKey: 'TDa5LTBPjRpKS4c7GxOOr3-qyVj9EZ',
                        debug: true,
                    })
                })
                .then(res => {
                    console.log(`response ==`);
                    console.log(res);
                    return res.json();
                })
                .then(res => {
                    console.log(`json:`);
                    console.log(res);
                    console.log(`results = `) || console.log(res.results);
                    let chatKey = res.response.body.chatKey;
                    if (chatKey)
                       console.log('chatKey == ') || console.log(chatKey);
                })
                .catch(error => console.log(`error = ${error}`));
        }finally {
            this.setState({
                getVal: '',
                postVal: ''
            })
        }
    };

    sendFignyaPOST = () => {
        console.log(`try to post text = ${this.state.postVal}`);
        let text = this.state.postVal;
        try {
            fetch(IP,
                {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        type: 'send',
                        name: 'lolkaName',
                        chatKey: 'TDa5LTBPjRpKS4c7GxOOr3-qyVj9EZ', //TDa5LTBPjRpKS4c7GxOOr3-qyVj9EZ (initial) ----    xHyfLTU7giMi77_EwGnAhwVduVDhUB -----
                        text: text
                    })
                })
                .then(res => {
                    console.log(`Everything okay, res = `);
                    console.log(res);
                    return res.json();
                })
                .then(json => console.log('json: ') || console.log(json))
                .catch(error => console.log(`error = ${error}`));
        }finally {
            this.setState({
                getVal: '',
                postVal: ''
            })
        }
    };

    sendCreateChat = () => {
        try {
            fetch(IP,
                {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        type: 'chat_create',
                        chatName: 'AtlasChat',
                    })
                })
                .then(res => {
                    console.log(`res = `);
                    console.log(res);
                    return res.json();
                })
                .then(res => {
                    console.log(`json ==`) || console.log(res);
                    console.log('chatKey == ') || console.log(res.results.chatKey)
                })
                .catch(error => console.log(`error = ${error}`));
        }finally {
            this.setState({
                getVal: '',
                postVal: ''
            })
        }
    };

    componentDidMount(){
        console.log('\n\n\n\n\n\n\n123');
        //console.log(`component did mount, ${window.onlol()}`);
        //window.handleClientLoad();
        fetch('http://localhost:8001')
            .then(a => console.log('\n\n\n\n\n\n\n\n\n\n\n\nres ==', a) || a.json())
            .then(json => console.log('json', json));
    }

     handleChange = ({ target: { name, value } }) => {
         this.setState({
             [name]: value
         });
     };

    render(){
        const styleForForm = { display: 'flex', alignItems: 'center'};
        return(
            <div style={{ display: 'flex' }}>
                <Paper style={{display: 'flex', flexDirection: 'column'}}>
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
                    <Route exact path='/' render={() =>
                        <Controls
                            styleForForm={styleForForm}
                            getVal={this.state.getVal}
                            postVal={this.state.postVal}
                            handleChange={this.handleChange}
                            sendFignyaGET={this.sendFignyaGET}
                            sendFignyaPOST={this.sendFignyaPOST}
                            sendCreateChat={this.sendCreateChat}
                        />}
                    />
                    <Route exact path='/:id' component={DialogText} />} />
                    <Route render={() => (<h3>Wrong URL, sorry c^:</h3>)}/>
                </Switch>
            </div>
        )
    }
}

const Controls = ({styleForForm, getVal, handleChange, sendFignyaGET, postVal, sendFignyaPOST, sendCreateChat}) => {
    // console.log(`styleForForm:`) || console.log(styleForForm);
    // console.log(`getVal:`) || console.log(getVal);
    // console.log(`handleChange:`) || console.log(handleChange);
    // console.log(`sendFignyaGET:`) || console.log(sendFignyaGET);
    // console.log(`postVal:`) || console.log(postVal);
    // console.log(`sendFignyaPOST:`) || console.log(sendFignyaPOST);
    return (
        <Paper>
            <form style={styleForForm}>
                <TextField
                    name='getVal'
                    label='Last id'
                    value={getVal}
                    onChange={handleChange}
                    margin='normal'
                    autoComplete='off'
                />
                <Button
                    onClick={sendFignyaGET}
                    color='primary'
                    style={{height: '100%', marginLeft: '40px'}}
                    variant='contained'
                >
                    Get messages after this id
                </Button>
            </form>
            <form style={styleForForm}>
                <TextField
                    name='postVal'
                    label='Post message'
                    value={postVal}
                    onChange={handleChange}
                    margin='normal'
                    autoComplete='off'
                />
                <Button
                    className='button'
                    onClick={sendFignyaPOST}
                    color='primary'
                    style={{height: '100%', marginLeft: '40px'}}
                    variant='contained'
                >
                    Send new message
                </Button>
            </form>
            <Button
                onClick={sendCreateChat}
                color='primary'
                variant='contained'
            >
                create new chat
            </Button>
            <Button
                onClick={window.handleAuthClick}
                color='primary'
                variant='contained'
            >
                Try auth
            </Button>
            <Button
                onClick={window.revokeAccess}
                color='primary'
                variant='contained'
            >
                revoke access
            </Button>
        </Paper>
    );
};

const DialogText = ({match}) => (
    <div>
        <h3>ID: {match.params.id}</h3>
    </div>
);

ReactDOM.render(
    <Router>
        <BakaClass/>
    </Router>
,document.getElementById('root'));


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