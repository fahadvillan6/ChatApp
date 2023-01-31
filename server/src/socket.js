import { Server } from 'socket.io';

export default function Socket(httpserver) {
  const activeUsers = [];
  try {
    const io = new Server(httpserver, { cors: { origin: process.env.CLIENT } });
    io.on('connection', (socket) => {
      console.log('connected');
      socket.on('new-user-add', (data) => {
        console.log(data, 'dd');
        activeUsers.push(data);
      });
      socket.emit('get-users', activeUsers);
    });
  } catch (error) {
    console.log(error);
  }
}
