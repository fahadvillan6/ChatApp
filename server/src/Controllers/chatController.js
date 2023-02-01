import Message from '../Models/MessageModel.js';
import Chat from '../Models/ChatModel.js';

export const createRoom = async (req, res) => {
  const { userId, _id } = req.body;
  const exist = await Chat.findOne({ users: { $all: [userId, _id] } }).populate(
    'users',
    'Name'
  );
  if (exist) return res.json(exist);
  const chat = (await new Chat({ users: [userId, _id] }).save()).populate(
    'users',
    'Name'
  );
  // .then((data) => {
  //   res.send(data);
  // });
  res.send(chat);
};

export const fetchMessages = async (req, res) => {
  const id = req.params.id;
  try {
    const messages = await Message.find({ ChatId: id }).populate(
      'sender',
      'Name'
    );
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
};

export const CreateMessage = async (req, res) => {
  const { _id: sender, ChatId, Content } = req.body;
  const data = await new Message({ sender, ChatId, Content }).save();
  await data.populate('sender', 'Name');
  // .then((data) => {
  res.json(data);
  // })
  // .catch((e) => res.sendStatus(500));
};
