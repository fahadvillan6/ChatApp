import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('db connected');
});
connection.on('error', (err) => {
  console.log(err);
});

export default mongoose;
