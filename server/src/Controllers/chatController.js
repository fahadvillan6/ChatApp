import Message from '../Models/MessageModel.js';
import Chat from '../Models/ChatModel.js';

export const createRoom = async (req, res) => {
  const { userId, _id } = req.body;
  const exist = await Chat.find({ users: { $all: [userId, _id] } });
  if (exist) return res.json(exist);
  new Chat({ users: [userId, _id] }).save().then((data) => {
    res.send(data);
  });
};

export const fetchMessages = async (req, res) => {
  const id = req.params.id;
  try {
    const messages = await Message.find({ ChatId: id }).populate(
      'sender','Name'
    );
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
};

export const CreateMessage = (req, res) => {
  const { _id: sender, ChatId, Content } = req.body;
  new Message({ sender, ChatId, Content }).save().then((data) => {
    res.json(data);
  });
};
