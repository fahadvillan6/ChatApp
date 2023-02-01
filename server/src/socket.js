import { Server } from 'socket.io';

export default function Socket(httpserver) {
  const activeUsers = [];
  try {
    const io = new Server(httpserver, { cors: { origin: process.env.CLIENT } });
    io.on('connection', (socket) => {
      console.log('connected');
      socket.on('new-user-add', (data) => {
        const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
        if (activeUsers.some((val) => val.userId === data)) {
          return;
        }
        if (checkForHexRegExp.test(data)) {
          activeUsers.push({ userId: data, id: socket.id });
          console.log(activeUsers);
        }
      });
      socket.emit('get-users', activeUsers);
      socket.on('send-message', (data) => {
        console.log(data, 'message');
        const { reciever } = data;
        const user = activeUsers.find((user) => user.userId === reciever);
        console.log(user);
        if (user) io.to(user.id).emit('recieve-message', data);
      });
    });
  } catch (error) {
    console.log(error);
  }
}
