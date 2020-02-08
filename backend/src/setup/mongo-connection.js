import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
export let connection = {};

(() => {
  const dev_db_url = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASS}@cluster0-jgkmz.mongodb.net/cake_chat_db?retryWrites=true`;
  const mongoDB = process.env.MONGODB_URI || dev_db_url;
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  connection = mongoose.connection;
  connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
})();
