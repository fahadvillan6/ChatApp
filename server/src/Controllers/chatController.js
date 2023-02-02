import Message from '../Models/MessageModel.js';
import Chat from '../Models/ChatModel.js';
import { isValidObjectId, Types } from 'mongoose';

export const createRoom = async (req, res) => {
  const { userId, _id } = req.body;
  try {
    if (isValidObjectId(userId)) {
      const exist = await Chat.findOne({
        users: { $all: [userId, _id] },
      }).populate('users', 'Name');
      if (exist) return res.json(exist);
      const chat = await new Chat({ users: [userId, _id] }).save();
      await chat.populate('users', 'Name');
      res.send(chat);
    }
  } catch (error) {
    console.log(error, 'RoomCreattio');
  }
};
export const fetchChats = async (req, res) => {
  const { _id } = req.body;
  // const Chats = await Chat.find({ users: _id }).populate('users', 'Name');
  const Chats = await Chat.aggregate([
    { $match: { users: Types.ObjectId(_id) } },
    {
      $lookup: {
        localField: 'users',
        foreignField: '_id',
        from: 'users',
        as: 'users',
        pipeline: [
          {
            $match: {
              _id: { $ne: Types.ObjectId(_id) },
            },
          },
          {
            $project: {
              Name: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: '$users',
      },
    },
    {
      $sort: {
        updatedAt: -1,
      },
    },
  ]);
  res.send(Chats);
};
export const fetchMessages = async (req, res) => {
  const id = req.params.id;
  try {
    if (isValidObjectId(id)) {
      const messages = await Message.find({ ChatId: id }).populate(
        'sender',
        'Name'
      );
      res.json(messages);
    }
  } catch (error) {
    console.log(error, 'fetchMessage');
  }
};

export const CreateMessage = async (req, res) => {
  const { _id: sender, ChatId, Content } = req.body;
  try {
    const data = await new Message({ sender, ChatId, Content }).save();
    await data.populate('sender', 'Name');
    await Chat.findOneAndUpdate(
      { _id: Types.ObjectId(ChatId) },
      { lastMessage: data.Content }
    );
    res.json(data);
  } catch (error) {
    console.log(error, 'sending Message');
    // res.sendStatus(500);
  }
};
