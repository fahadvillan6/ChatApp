import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchMessagesApi, sendMessageApi } from '../ApiRequests';

export default function Conversation({ currentChat, users }) {
  const [chats, setChats] = useState([]);
  const { userid } = useSelector((state) => state.auth);
  const messageRef = useRef('');
  console.log(users, 'users');
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await fetchMessagesApi(currentChat[0]?._id);
      setChats(data);
    };
    currentChat.length && fetchMessages();
  }, [currentChat]);
  console.log(currentChat, '90');
  const sendMessage = async () => {
    const { data } = await sendMessageApi({
      Content: messageRef.current.value,
      ChatId: currentChat[0]?._id,
    });
  };

  return (
    <div className='flex flex-col flex-auto h-screen     p-6'>
      <div className='flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4'>
        <div className='flex flex-col h-full overflow-x-auto mb-4'>
          <div className='flex flex-col h-full'>
            {currentChat.length ? (
              <>
                <nav className='p-3 border-gray-200 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
                  <div className='flex gap-5'>
                    <img src='' alt='avatar' />
                    <p>Name</p>
                  </div>
                  <span className='ml-5'>online</span>
                </nav>
                <div className='grid grid-cols-12 gap-y-2 h-auto '>
                  {chats.map((chat) => {
                    return (
                      <>
                        <div
                          className={
                            userid === chat.sender._id
                              ? 'col-start-1 col-end-8 p-3 rounded-lg'
                              : 'col-start-6 col-end-13 p-3 rounded-lg'
                          }
                        >
                          <div
                            className={
                              userid === chat.sender._id
                                ? 'flex flex-row items-center'
                                : 'flex items-center justify-start flex-row-reverse'
                            }
                          >
                            <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0'>
                              {chat.sender.Name[0]}
                            </div>
                            <div className='relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl'>
                              <div>{chat.Content}</div>
                            </div>
                          </div>
                        </div>{' '}
                        {/* <div className='col-start-6 col-end-13 p-3 rounded-lg'>
                  <div className='flex items-center justify-start flex-row-reverse'>
                    <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0'>
                      A
                    </div>
                    <div className='relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl'>
                      <div>I'm ok what about you?</div>
                    </div>
                  </div>
                </div> */}
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className='ml-auto mr-auto mt-auto mb-auto'>
                Select a Chat to continue
              </p>
            )}
          </div>
        </div>
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
              <input
                ref={messageRef}
                type='text'
                className='flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10'
              />
              <button className='absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
              </button>
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
