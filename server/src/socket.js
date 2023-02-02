import { Types } from 'mongoose';
import { Server } from 'socket.io';
import ActiveUsers from './Models/ActiveUsers.js';

// const ActiveUsersList = new ActiveUsers({
//   Users: {},
// });
const ActiveUsersList = await ActiveUsers.findById(
  Types.ObjectId('63db6feeacbf61c07919c34a')
);
export default function Socket(httpserver) {
  let activeUsers = [];
  try {
    const io = new Server(httpserver, { cors: { origin: process.env.CLIENT } });
    io.on('connection', async (socket) => {
      console.log('connected');
      socket.on('new-user-add', (data) => {
        const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
        if (activeUsers.some((val) => val.userId === data)) {
          return;
        }
        if (checkForHexRegExp.test(data)) {
          // ActiveUsersList.Users.set(socket.id, data);
          // ActiveUsersList.save();
          activeUsers.push({ userId: data, id: socket.id });
          console.log(data);
        }
      });
      socket.emit('get-users', activeUsers);
      socket.on('send-message', async (data) => {
        console.log(data, 'message');
        const { reciever } = data;
        console.log(reciever, 'dlfk', activeUsers);

        const user = activeUsers.find((user) => user.userId === reciever);
        // const ActiveUsersList = await ActiveUsers.findById(
        //   Types.ObjectId('63db6feeacbf61c07919c34a')
        // );
        // let user;
        // ActiveUsersList.Users.forEach((val, key) => {
        //   if (val === reciever) {
        //     user = key;
        //   }
        // });

        console.log(user, 'dsklldskksdlkldskdslskdl');
        if (user) io.to(user.id).emit('recieve-message', data);
      });
      socket.on('disconnect', async () => {
        console.log('disconnected', socket.id);
        // const ActiveUsersList = await ActiveUsers.findById(
        //   Types.ObjectId('63db6feeacbf61c07919c34a')
        // );
        // ActiveUsersList.Users.delete(socket.id);
        // console.log(ActiveUsersList.Users);
        // ActiveUsersList.save();
        activeUsers = activeUsers.filter((user) => user.id !== socket.id);
      });
    });
  } catch (error) {
    console.log(error);
  }
}
