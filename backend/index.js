const express = require('express');
const app = express();

const api = require('./temporary-store/chats');

app.get('/:chatId?', (req, res) => {
  // console.log('------');

  const chatId = req.params.chatId;
  const foundChat = api.getChat(chatId);
  const allChats = api.getChatList();
  // console.log('all chats: ', allChats);
  // console.log('found chat: ', foundChat);
  console.log();
  console.log('------');

  // set headers
  res
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
  if (!foundChat) {
    return res
      .status(400)
      .header('Content-Type', 'text/plain')
      .send(`Chat with id: ${chatId} not found.`);
  }
  // send response
  res.send(
    JSON.stringify({
      matching: foundChat,
      all: allChats,
    }),
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
