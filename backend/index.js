const express = require('express');
const app = express();
const port = 8001;

app.get('/:chatId?', (req, res) => {
  console.log('request body: ', req.body);
  console.log('cookies: ', req.cookies);
  console.log('ip: ', req.ip);
  console.log('params', req.params);
  console.log('------')
  
  
  res.status(200);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.send(`{"text": "${req.body || 'haru'}"}`);
  res.send('hellloooo!!!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));