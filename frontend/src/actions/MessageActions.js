import Cookies from "js-cookie";

export const IP = "https://api.cakeproject.ru/";
export const COOKIE_CHATS = "chats";
export const HOMEPAGE = "https://cakeproject.ru/";

export const CREATE_CHAT_REQUEST = "CREATE_CHAT_REQUEST";
export const CREATE_CHAT_SUCCESS = "CREATE_CHAT_SUCCESS";
export const CREATE_CHAT_ERROR = "CREATE_CHAT_ERROR";

export const GET_MESSAGES_REQUEST = "GET_MESSAGES_REQUEST";
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
export const GET_MESSAGES_ERROR = "GET_MESSAGES_ERROR";
export const GET_INITIAL_SUCCESS = "GET_INITIAL_SUCCESS";

export const POST_MESSAGE_REQUEST = "POST_MESSAGE_REQUEST";
export const POST_MESSAGE_SUCCESS = "POST_MESSAGE_SUCCESS";
export const POST_MESSAGE_ERROR = "POST_MESSAGE_ERROR";

export const LEFT_CHAT = "LEFT_CHAT";

//Get action creators

//export const chatKeys = ['TDa5LTBPjRpKS4c7GxOOr3-qyVj9EZ', 'xHyfLTU7giMi77_EwGnAhwVduVDhUB'];
//TDa5LTBPjRpKS4c7GxOOr3-qyVj9EZ (initial) ----    xHyfLTU7giMi77_EwGnAhwVduVDhUB -----

//Chat actions
const createChatRequest = () => {
  return {
    type: CREATE_CHAT_REQUEST
  };
};

const createChatSuccess = (chatKey, chatName) => {
  return {
    type: CREATE_CHAT_SUCCESS,
    chatKey: chatKey,
    chatName: chatName
  };
};

const createChatError = () => {
  return {
    type: CREATE_CHAT_ERROR
  };
};

export const createChat = chatName => {
  return dispatch => {
    dispatch(createChatRequest());
    // console.log(`trying to create chat`);
    fetch(IP, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        type: "chat_create",
        chatName: chatName,
        debug: true
      })
    })
      .then(res => res.json())
      .then(json => {
        let chatKey = json.results.chatKey;
        // console.log(`chat created with chatKey ==`) || console.log(chatKey);
        //console.log(`getJson : `) || console.log(Cookies.getJSON(COOKIE_CHATS));
        //console.log(`try to set this: `) || console.log([...Cookies.getJSON(COOKIE_CHATS), {key: chatKey, name: chatName}]);
        Cookies.set(
          COOKIE_CHATS,
          [...Cookies.getJSON(COOKIE_CHATS), { key: chatKey, name: chatName }],
          { expires: 1000 }
        ); //adding new chatKey to cookie
        // console.log(`new cookie == `) || console.log(Cookies.get(COOKIE_CHATS));
        dispatch(createChatSuccess(chatKey, chatName));
      })
      .catch(() => dispatch(createChatError()));
  };
};

const leftChat = chatKey => {
  return {
    type: LEFT_CHAT,
    key: chatKey
  };
};

export const leaveChat = chatKey => {
  return dispatch => {
    let cookiesJson = Cookies.getJSON(COOKIE_CHATS);
    //cookiesJson.forEach(a => console.log(`${a.key}  ${a.key === chatKey}`));
    let index = cookiesJson.indexOf(cookiesJson.find(a => a.key === chatKey));
    //console.log(`index == ${index}, chatKey == ${chatKey}`) || console.log(cookiesJson);
    if (index !== -1 && index !== 0 && index !== 1) {
      //if user tries to leave from not stored chat, or from initial chats - don't do anything
      //delete this chat from cookies
      Cookies.set(COOKIE_CHATS, cookiesJson.filter(a => a.key !== chatKey));
      //console.log(`new cookies ==`) || console.log(Cookies.getJSON(COOKIE_CHATS));
      dispatch(leftChat(chatKey));
    }
  };
};

//Messages actions:

const getMessagesRequest = () => {
  return {
    type: GET_MESSAGES_REQUEST
  };
};

const getMessagesSuccess = (newMessages, chatKey) => {
  return {
    type: GET_MESSAGES_SUCCESS,
    newMessages: newMessages,
    chatKey: chatKey
  };
};

const getInitialSuccess = (newMessages, chatKey) => {
  return {
    type: GET_INITIAL_SUCCESS,
    newMessages: newMessages,
    chatKey: chatKey
  };
};

const getMessagesError = () => {
  return {
    type: GET_MESSAGES_ERROR
  };
};

//Post action creators

const postMessageReqest = () => {
  return {
    type: POST_MESSAGE_REQUEST
  };
};

const postMessageSuccess = () => {
  return {
    type: POST_MESSAGE_SUCCESS
  };
};

const postMessageError = () => {
  return {
    type: POST_MESSAGE_ERROR
  };
};

//Async actions

export const getInitialMessages = chatKey => {
  return dispatch => {
    dispatch(getMessagesRequest());
    fetch(IP, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        type: "get_messages",
        lastId: -1,
        chatKey: chatKey,
        debug: true
      })
    })
      .then(res => res.json())
      .then(json => {
        // console.log(`json ==`) || console.log(json);
        let chatKeyRes = json.response.body.chatKey;
        if (chatKeyRes) {
          //if no chatKey was provided
          //  console.log('chatKey == ') || console.log(chatKeyRes);
          dispatch(getInitialSuccess(json.results.items, chatKeyRes));
        } else {
          dispatch(getInitialSuccess(json.results.items, chatKey));
        }
      })
      .catch(() => dispatch(getMessagesError()));
  };
};

export const getMessages = (lastId, chatKey) => {
  return dispatch => {
    //console.log(`getting message, lastId: ${lastId}, chatKey: ${chatKey}`);
    dispatch(getMessagesRequest());
    fetch(IP, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        type: "get_messages",
        lastId: lastId,
        chatKey: chatKey,
        debug: true
      })
    })
      .then(res => {
        // console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          // console.log(`no json`);
          return [];
        }
      })
      .then(json => {
        //  console.log(`json ==`) || console.log(json);
        if (Array.isArray(json) && json.length === 0) {
          //if no json
          //  console.log(`no new messages`);
          dispatch(getMessagesSuccess([], chatKey));
        } else {
          let newMessages = json.results.items;
          if (!newMessages || newMessages.length === 0) {
            //if no new messages
            // console.log(`no new messages`);
            dispatch(getMessagesSuccess([], chatKey));
          } else {
            //  console.log(newMessages);
            let chatKeyRes = json.response.body.chatKey;
            if (chatKeyRes) {
              //if no chatKey was provided
              //  console.log('chatKey == ') || console.log(chatKeyRes);
              dispatch(getMessagesSuccess(newMessages, chatKeyRes));
            } else {
              dispatch(getMessagesSuccess(newMessages, chatKey));
            }
          }
        }
      })
      .catch(() => dispatch(getMessagesError()));
  };
};

export const postMessages = (text, name, chatKey, penultimateId) => {
  return dispatch => {
    dispatch(postMessageReqest());
    fetch(IP, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        type: "send",
        name: name,
        text: text,
        chatKey: chatKey,
        debug: true
      })
    })
      .then(() => {
        dispatch(postMessageSuccess());
        dispatch(getMessages(penultimateId, chatKey)); //to call immediate update
      })
      .catch(() => dispatch(postMessageError()));
  };
};
