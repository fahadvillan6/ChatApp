import mongoose, { model } from 'mongoose';

const ActiveUsersSchema = new mongoose.Schema({
  Users: {
    type: Map,
    of: String,
  },
});

const ActiveUsers = model('ActiveUsers', ActiveUsersSchema);

export default ActiveUsers;
