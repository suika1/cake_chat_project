import React from 'react';
import { connect } from 'react-redux';
import Page from '../components/Page';
import Cookies from 'js-cookie'
import {COOKIE_CHATS} from "../actions/MessageActions";
import { triggerGoogleLoaded } from "../actions/AuthActions";

//import { withStyles } from '@material-ui/core/styles';

const checkCookies = () => {
    if (!navigator.cookieEnabled) {
        alert( 'Включите cookie для комфортной работы с этим сайтом' );
    }else{
        let chatKeys = Cookies.getJSON(COOKIE_CHATS);
        console.log(`\n\n\nChatKeys: `) || console.log(chatKeys);
    }
};

//TODO: remove
let loaded = false;

class App extends React.Component{
    componentDidMount(){
        this.attachAuthScript();
        checkCookies();
    }

    //load Google's JS lib and let user authenticate
    attachAuthScript = () => {
        let s = document.createElement('script');
        s.src = "https://apis.google.com/js/api.js";
        s.defer = true;
        s.onload = () => {
            console.log(`js api loaded`);
            this.props.triggerGoogleLoaded();
            loaded = true;
        };
        s.onerror = () => console.log(`error while loading script`);
        document.head.appendChild(s);
    };

    render(){
        const { page } = this.props;
        return (
            <Page
                loaded={loaded}
                error={page.error}
                isFetching={page.isFetching}
            />
        );
    }
}

const mapStateToProps = store => {
    return {
        page: store.messages,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        triggerGoogleLoaded: () => dispatch(triggerGoogleLoaded()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

