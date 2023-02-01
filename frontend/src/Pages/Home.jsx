import { useEffect, useState, useRef } from 'react';
import Chat from '../Components/Chat';
import Conversation from '../Components/Conversation';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

export default function Home() {
  const [currentChat, setChat] = useState('');
  const socketRef = useRef();
  const [users, setUsers] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_BACKEND_URL);
    console.log(userId, 'dd');
    socketRef.current.emit('new-user-add', userId);
    socketRef.current.on('get-users', (users) => {
      console.log(users, 'kk');
      setUsers(users);
    });
   
  }, [userId]);

  return (
    <div className='flex'>
      <Chat setChat={setChat} />
      <Conversation
        socket={socketRef}
      
        currentChat={currentChat}
        users={users}
      />
    </div>
  );
}
