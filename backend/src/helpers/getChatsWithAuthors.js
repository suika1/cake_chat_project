import lodash from 'lodash';
import { Types } from 'mongoose'; 
import { ChatModel as Chat } from '../models/chat';
import { UserModel as User } from '../models/user';

export const getChatsWithAuthors = async ({
  chatId,
  email,
}) => {
  const { ObjectId } = Types;

  const user = await User.findOne({
    email,
  });
  const userChatList = user.chatList.map(a => JSON.stringify(a));

  if (chatId) {
    // Get single chat by Id
    const chats = await Chat.aggregate([{
      $match: {
        _id: ObjectId(chatId),
      },
    }, {
      $unwind: {
        path: '$messages',
        preserveNullAndEmptyArrays: true,
      },
    }, {
      $lookup: {
        from: 'users',
        localField: 'messages.authorId',
        foreignField: '_id',
        as: 'userObjects',
      },
    }, {
      $unwind: {
        path: '$userObjects',
        preserveNullAndEmptyArrays: true,
      },
    }, {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        authorId: { $first: '$authorId' },
        userList: { $push: '$userList' },
        messages: { $push: '$messages' },
        userObjects: { $push: '$userObjects' },
      },
    }]);

    const chat = chats[0];

    chat.messages.forEach(message => {
      const author = chat.userObjects.find(user => JSON.stringify(user._id) === JSON.stringify(message.authorId));
      message.author = lodash.pick(author, ['_id', 'name', 'email']);
      delete message.authorId;
    });
    delete chat.userObjects;

    return chat;
  }

  // Get all chats
  const chats = await Chat.aggregate([{
    $unwind: {
      path: '$messages',
      preserveNullAndEmptyArrays: true,
    },
  }, {
    $lookup: {
      from: 'users',
      localField: 'messages.authorId',
      foreignField: '_id',
      as: 'userObjects',
    },
  }, {
    $unwind: {
      path: '$userObjects',
      preserveNullAndEmptyArrays: true,
    },
  }, {
    $group: {
      _id: '$_id',
      name: { $first: '$name' },
      authorId: { $first: '$authorId' },
      userList: { $push: '$userList' },
      messages: { $push: '$messages' },
      userObjects: { $push: '$userObjects' },
    },
  }]);
  const chatsForCurrentUser = chats
    .filter(chat => userChatList.includes(JSON.stringify(chat._id)))
    .sort((one, two) => one.name.toString().localeCompare(two.name.toString()));

  chatsForCurrentUser.forEach(chat => {
    chat.messages.forEach(message => {
      const author = chat.userObjects.find(user => JSON.stringify(user._id) === JSON.stringify(message.authorId));
      message.author = lodash.pick(author, ['_id', 'name', 'email']);
      delete message.authorId;
    });
    delete chat.userObjects;
  });

  return chatsForCurrentUser;
}
