import { useEffect, useState, useRef } from 'react';
import Chat from '../Components/Chat';
import Conversation from '../Components/Conversation';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../ApiRequests';
import { setId, setName } from '../Store/AuthSlice';

export default function Home() {
  const [currentChat, setChat] = useState('');
  const socketRef = useRef();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_BACKEND_URL);
    console.log(userId, 'dd');
    socketRef.current.emit('new-user-add', userId);
    socketRef.current.on('get-users', (users) => {
    
      setUsers(users);
    });
  }, [userId]);

  const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  useEffect(() => {
    const checkUserid = async () => {
      if (!userId || !checkForHexRegExp.test(userId)) {
        const { data } = await fetchUserDetails();
        dispatch(setName(data.Name));
        dispatch(setId(data._id));
      }
      return;
    };
    socketRef.current?.on('recieve-message', (data) => {
      console.log('kkkkkkkkkkkkkkk', data);
    });

    checkUserid();
  }, []);

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
