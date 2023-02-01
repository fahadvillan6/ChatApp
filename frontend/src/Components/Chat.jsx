import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createRoomApi, fetchUsers } from '../ApiRequests';

export default function Chat({ setChat }) {
  const { Name } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await fetchUsers();
      setUsers([...data]);
    };
    fetchUser();
  }, []);
  const createRoom = async (userid) => {
    try {
      const { data } = await createRoomApi(userid);
      setChat(data);
    } catch (error) {}
  };
  return (
    <div className='flex h-screen antialiased text-gray-800'>
      <div className='flex flex-row h-full w-full overflow-x-hidden'>
        <div className='flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0'>
          <div className='flex flex-row items-center justify-center h-12 w-full'>
            <div className='flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
                ></path>
              </svg>
            </div>
            <div className='ml-2 font-bold text-2xl'>ChatApp</div>
          </div>
          <div className='flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg'>
            <div className='h-20 w-20 rounded-full border overflow-hidden'>
              <img
                src='https://avatars3.githubusercontent.com/u/2763884?s=128'
                alt='Avatar'
                className='h-full w-full'
              />
            </div>
            <div className='text-sm font-semibold mt-2'>{Name}</div>
            <div className='text-xs text-gray-500'>Lead UI/UX Designer</div>
            <button className='mt-2'> logout</button>
          </div>
          <div className='flex flex-col mt-8'>
            <div className='flex flex-row items-center justify-between text-xs'>
              <span className='font-bold'> Conversations</span>
              {/* <span className='flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full'>
                
              </span> */}
            </div>
            <div className='flex flex-col space-y-1 mt-4 -mx-2 h-auto overflow-y-auto'>
              {users.map((user) => {
                return (
                  <button
                    key={user._id}
                    onClick={() => createRoom(user._id)}
                    className='flex flex-row items-center hover:bg-gray-100 rounded-xl p-2'
                  >
                    <div className='flex items-center justify-center h-10 w-10 bg-indigo-200 rounded-full'>
                      {user.Name[0]}
                    </div>
                    <div className='ml-4 text-sm font-semibold'>
                      {user.Name}
                      <p className='ml-3 text-sm font-normal'>lastchat</p>
                    </div>
                  </button>
                );
              })}
              {/* <button className='flex flex-row items-center hover:bg-gray-100 rounded-xl p-2'>
                <div className='flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full'>
                  M
                </div>
                <div className='ml-2 text-sm font-semibold'>Marta Curtis</div>
                <div className='flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none'>
                  2
                </div>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
