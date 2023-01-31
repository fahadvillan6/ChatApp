import { Schema, model } from 'mongoose';
const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  ChatId: {
    type: Schema.Types.ObjectId,
  },
  Content: {
    type: String,
  },

},{timestamps:true});

const Message = model('Messages',MessageSchema)


export default Message