import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InputEmoji from 'react-input-emoji';
import { fetchMessagesApi, sendMessageApi } from '../ApiRequests';

export default function Conversation({ currentChat, users, socket }) {
  const [chats, setChats] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState();
  const [inputMsg, SetInputMessage] = useState();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await fetchMessagesApi(currentChat?._id);
      setChats(data);
    };
    currentChat !== null && fetchMessages();
  }, [currentChat]);
  const user = currentChat?.users?.filter((values) => values._id !== userId);

  const sendMessage = async () => {
    if (inputMsg.trim() === '') return;
    const { data } = await sendMessageApi({
      Content: inputMsg,
      ChatId: currentChat?._id,
    });
    if (data) {
      // setNewMessage(data);
      SetInputMessage('');
      setChats([...chats, data]);
      data.reciever = user[0]._id;
      socket.current.emit('send-message', data);
    }
  };
  useEffect(() => {
    console.log(socket.current?.on);
    socket.current?.on('recieve-message', (data) => {
      console.log('kkkkkkkkkkkkkkk', data);
      alert(data.Content);
      const updatedChat = [...chats, data];
      setChats([...updatedChat]);
      console.log(data, 'dddrr');

      // setNewMessage(data);
    });
  }, []);

  const onlineCheck = () => {
    return users.some((val) => val.userId === user[0]._id);
    // console.log(users, 'Usersss', socket.current);
  };

  return (
    <div className='flex flex-col flex-auto h-screen     p-4'>
      <div className='flex flex-col mb-3  flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 '>
        {currentChat ? (
          <>
            <nav className='p-3    w-full   border-gray-300 rounded bg-gray-50 shadow-sm shadow-zinc-400 dark:bg-gray-800 dark:border-gray-700'>
              <div className='flex'>
                <div className='w-12 h-12 mr-4 relative flex flex-shrink-0'>
                  <img
                    className='shadow-md rounded-full w-full h-full object-cover'
                    src={
                      'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                    }
                    alt=''
                  />
                </div>
                <div className='text-sm'>
                  <p className='font-bold'>{user[0].Name}</p>
                  <p>{onlineCheck() ? 'online' : 'offline'}</p>
                </div>
              </div>
            </nav>
            <div className='flex flex-col h-full mt-2 overflow-x-hidden mb-4 '>
              <div className='flex flex-col h-full'>
                <>
                  <div className='grid grid-cols-12 gap-y-2 h-auto '>
                    {chats.map((chat) => {
                      return (
                        <>
                          <div
                            key={chat._id}
                            className={
                              userId !== chat?.sender._id
                                ? 'col-start-1 col-end-8 p-7 rounded-lg'
                                : 'col-start-6 col-end-13 p-3 rounded-lg'
                            }
                          >
                            <div
                              className={
                                userId !== chat?.sender._id
                                  ? 'flex flex-row items-center'
                                  : 'flex items-center justify-start flex-row-reverse'
                              }
                            >
                              <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0'>
                                {chat?.sender.Name[0]}
                              </div>
                              <div
                                className={
                                  userId !== chat?.sender._id
                                    ? 'relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl'
                                    : 'relative mr-3 text-sm bg-white py-2 px-4 shadow rounded-xl'
                                }
                              >
                                <div>{chat?.Content}</div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              </div>
            </div>
          </>
        ) : (
          <p className='ml-auto mr-auto mt-auto mb-auto'>
            Select a Chat to continue
          </p>
        )}
        <div className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'>
          <div>
            <button className='flex items-center justify-center text-gray-400 hover:text-gray-600'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                ></path>
              </svg>
            </button>
          </div>
          <div className='flex-grow ml-4'>
            <div className='relative w-full'>
              <InputEmoji
                onEnter={sendMessage}
                cleanOnEnter
                value={inputMsg}
                onChange={(msg) => SetInputMessage(msg)}
              />
            </div>
          </div>
          <div className='ml-4'>
            <button
              onClick={sendMessage}
              className='flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0'
            >
              <span>Send</span>
              <span className='ml-2'>
                <svg
                  className='w-4 h-4 transform rotate-45 -mt-px'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
