import mongoose from 'mongoose';

export const generateResponse = ({
  res,
  status = 200,
  results = '',
  error = '',
  ok = true,
  ...another
}) => {
  if (error && error.length) ok = false;
  return res.status(status).send(
    JSON.stringify({
      results,
      ok,
      error,
      ...another,
    }),
  );
};

export const setupMongoConnection = () => {
  const dev_db_url = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASS}@cluster0-jgkmz.mongodb.net/cake_chat_db?retryWrites=true`;
  const mongoDB = process.env.MONGODB_URI || dev_db_url;
  mongoose.connect(mongoDB, {useNewUrlParser: true});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
