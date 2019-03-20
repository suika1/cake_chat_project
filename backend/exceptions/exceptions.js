class ChatNotFoundException extends Error {
  constructor(chatId) {
    super(chatId ? `Chat with id ${chatId} not found` : 'Chat not found');
  }
}

class MessageNotFoundException extends Error {
  constructor(chatId, messageId) {
    super(`Message with id = ${messageId} not found in chat with id = ${chatId}`)
  }
}

class BadFieldsException extends Error {
  constructor(...badFieldNames) {
    super(`Bad value for fields: ${JSON.stringify(badFieldNames)}`);
    this.fields = badFieldNames;
  }
}

class ChatAlreadyExistsException extends Error {
  constructor(name) {
    super(`Chat with name ${name} already exists`)
  }
}

module.exports = {
  ChatNotFoundException,
  BadFieldsException,
  ChatAlreadyExistsException,
  MessageNotFoundException,
};
