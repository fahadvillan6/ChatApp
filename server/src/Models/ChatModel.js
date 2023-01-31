import { Schema, model } from 'mongoose';

const ChatSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Messages',
  },
});

const Chat = model('Chat', ChatSchema);
export default Chat;
