import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    select: false,
  },
});

const User = model('User', userSchema);
export default User;
