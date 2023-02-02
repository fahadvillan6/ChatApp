import { Schema, model } from 'mongoose';

const ChatSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  lastMessage: {
    type: String,
  },
});

const Chat = model('Chat', ChatSchema);
export default Chat;
