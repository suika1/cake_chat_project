import { IP } from "./MessageActions";

export const AUTH_SIGNED_IN = 'AUTH_SIGNED_IN';
export const AUTH_SIGNED_OUT = 'AUTH_SIGNED_OUT';

const authSignedIn = user => {
    return {
        type: AUTH_SIGNED_IN,
        user: user,
    }
};

const authSignedOut = () => {
    return {
        type: AUTH_SIGNED_OUT,
    }
};

/* eslint-disable no-undef */

let GoogleAuth;
const SCOPE = 'profile email';

function initClient(dispatch) {
    return () => {
        // Initialize the gapi.client object, which app uses to make API requests.
        // Get API key and client ID from API Console.
        // 'scope' field specifies space-delimited list of access scopes.
        gapi.client.init({
            'apiKey': 'AIzaSyA8mOfHwAWYbfcsL7UitrsQsCT1ydSuSqA',
            'discoveryDocs': [],
            'clientId': '678710537869-50dae506q34t32t14vaqqtrg0sqsdqhh.apps.googleusercontent.com',
            'scope': SCOPE
        }).then(() => {
            console.log(`then, after init`);
            GoogleAuth = gapi.auth2.getAuthInstance();
            // Listen for sign-in state changes.
            GoogleAuth.isSignedIn.listen(setSigninStatus(dispatch));
            setSigninStatus(dispatch)();
        });
    }
}

export function handleAuthClick() {
    try {
        if (GoogleAuth.isSignedIn.get()) {
            // User is authorized and has clicked 'Sign out' button.
            GoogleAuth.signOut();
        } else {
            // User is not signed in. Start Google auth flow.
            GoogleAuth.signIn();
        }
    } catch(e) {
        console.log(`auth error:`) || console.log(e);
    }
}

function setSigninStatus(dispatch) {
    return () => {
            let user = GoogleAuth.currentUser.get();
            let isAuthorized = user.hasGrantedScopes(SCOPE);
            if (isAuthorized) {
            onSignIn(user);
            //setting profile data for dispatching
            let basicProfile = user.getBasicProfile();
            let profile = {
                name: basicProfile.getGivenName(),
                familyName: basicProfile.getFamilyName(),
                fullName: basicProfile.getName(),
                imageUrl: basicProfile.getImageUrl(),
                email: basicProfile.getEmail(),
            };
            dispatch(authSignedIn(profile));
            console.log('You are currently signed in and have granted access to this app.');
        } else {
            //send message, that user left
            dispatch(authSignedOut());
            console.log('You have not authorized this app or you are signed out.');
        }

    }
}

//just log user data
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    let profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    let id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    //send data by token to server
    console.log(`---- login with token == ${id_token}`);
    fetch(IP,
        {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                type: 'login',
                token: id_token,
                debug: true,
            }),
        })
        .then(res => {
            console.log(`response from onLogined action:`) || console.log(res);
            return res.json();
        })
        .catch(e => console.log(e));
}

export function triggerGoogleLoaded() {
    return dispatch => {
        console.log("google lib loaded");
        gapi.load('client:auth2', initClient(dispatch));
    }
}
