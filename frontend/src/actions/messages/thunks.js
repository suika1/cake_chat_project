import * as actions from './actions';

import Cookies from 'js-cookie';

import { COOKIE_CHATS } from 'utils/app-constants';

import { BaseUrl } from 'api/api';

export const createChat = chatName => {
  return dispatch => {
    dispatch(actions.createChatRequest());
    fetch(BaseUrl, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        name: chatName,
      }),
    })
      .then(res => res.json())
      .then(json => {
        const chatKey = json.results.id;
        Cookies.set(
          COOKIE_CHATS,
          [...Cookies.getJSON(COOKIE_CHATS), { key: chatKey, name: chatName }],
          { expires: 1000 },
        ); // adding new chatKey to cookie
        dispatch(actions.createChatSuccess(chatKey, chatName));
      })
      .catch(() => dispatch(actions.createChatError()));
  };
};

export const leaveChat = chatKey => {
  return dispatch => {
    const cookiesJson = Cookies.getJSON(COOKIE_CHATS);
    const index = cookiesJson.indexOf(cookiesJson.find(a => a.key === chatKey));
    if (index !== -1 && index !== 0 && index !== 1) {
      // if user tries to leave from not stored chat, or from initial chats - don't do anything
      // delete this chat from cookies
      Cookies.set(COOKIE_CHATS, cookiesJson.filter(a => a.key !== chatKey));
      dispatch(actions.leftChat(chatKey));
    }
  };
};

export const getInitialMessages = chatKey => {
  return async dispatch => {
    dispatch(actions.getMessagesRequest(chatKey));
    try {
      const res = await fetch(`${BaseUrl}${chatKey}`, {
        method: 'GET',
        mode: 'cors',
      });
      const json = await res.json();

      dispatch(
        actions.getInitialSuccess({
          newMessages: json.results.messages,
          chatKey,
          chatName: json.results.chatName,
        }),
      );
    } catch (err) {
      dispatch(actions.getMessagesError());
    }
  };
};

export const getMessages = (lastId, chatKey) => {
  return dispatch => [];
  // return async dispatch => {
  //   dispatch(actions.getMessagesRequest(chatKey));
  //   const res = await fetch(BaseUrl, {
  //     method: 'GET',
  //     mode: 'cors',
  //     body: JSON.stringify({
  //       lastId: lastId,
  //       chatKey: chatKey,
  //       debug: true,
  //     }),
  //   });
  //   const json = await res.json();
  //   try {
  //     if (Array.isArray(json) && json.length === 0) {
  //       //if no json
  //       dispatch(actions.getMessagesSuccess([], chatKey));
  //     } else {
  //       let newMessages = json.results.items;
  //       if (!newMessages || newMessages.length === 0) {
  //         //if no new messages
  //         dispatch(actions.getMessagesSuccess([], chatKey));
  //       } else {
  //         let chatKeyRes = json.response.body.chatKey;
  //         if (chatKeyRes) {
  //           //if no chatKey was provided
  //           dispatch(actions.getMessagesSuccess(newMessages, chatKeyRes));
  //         } else {
  //           dispatch(actions.getMessagesSuccess(newMessages, chatKey));
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     dispatch(actions.getMessagesError());
  //   }
  // };
};

export const postMessages = (text, name, chatKey, penultimateId) => {
  return async dispatch => {
    dispatch(actions.postMessageReqest());
    try {
      await fetch(`${BaseUrl}${chatKey}`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          author: name,
          text: text,
        }),
      });

      dispatch(actions.postMessageSuccess());
      dispatch(actions.getMessages(penultimateId, chatKey)); //to call immediate update
    } catch (err) {
      dispatch(actions.postMessageError());
    }
  };
};
