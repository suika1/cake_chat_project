const mongoose = require('mongoose');

const generateResponse = ({
  res,
  status = 200,
  results = '',
  error = '',
  ok = true,
}) => {
  return res.status(status).send(
    JSON.stringify({
      results,
      ok,
      error,
    }),
  );
};

const setupMongoConnection = () => {
  const dev_db_url = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASS}@cluster0-jgkmz.mongodb.net/cake_chat_db?retryWrites=true`;
  const mongoDB = process.env.MONGODB_URI || dev_db_url;
  mongoose.connect(mongoDB, {useNewUrlParser: true});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = {
  generateResponse,
  setupMongoConnection
};
