export class ChatNotFoundException extends Error {
  constructor(chatId) {
    super(chatId ? `Chat with id ${chatId} not found` : 'Chat not found');
  }
}

export class MessageNotFoundException extends Error {
  constructor(chatId, messageId) {
    super(`Message with id = ${messageId} not found in chat with id = ${chatId}`)
  }
}

export class BadFieldsException extends Error {
  constructor(...badFieldNames) {
    super(`Bad value for fields: ${JSON.stringify(badFieldNames)}`);
    this.fields = badFieldNames;
  }
}

export class ChatAlreadyExistsException extends Error {
  constructor(name) {
    super(`Chat with name ${name} already exists`)
  }
}

export default {
  ChatNotFoundException,
  BadFieldsException,
  ChatAlreadyExistsException,
  MessageNotFoundException,
};
