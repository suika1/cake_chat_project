const express = require('express');
const app = express();
const port = 8001;

app.get('/', (req, res) => {
  res.status(200);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send('{"text": "123"}');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));