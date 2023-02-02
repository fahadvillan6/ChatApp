import axios from 'axios';
import Cookie from 'universal-cookie';
const baseURL = import.meta.env.VITE_BACKEND_URL;
const cookie = new Cookie();
const Instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: { token: cookie.get('Token') },
});
export const registerApi = async (data) => {
  return await Instance.post('/register', data);
};
export const LoginApi = async (data) => {
  return await Instance.post('/login', data);
};

export const fetchUsers = async () => {
  return await Instance.get('/users');
};
export const findChats = async () => {
  return await Instance.get('/chats');
};
export const createRoomApi = async (userId) => {
  return await Instance.post(`/room`, { userId });
};

export const fetchMessagesApi = async (id) => {
  return await Instance.get(`/messages/${id}`);
};

export const sendMessageApi = async (data) => {
  return await Instance.post('/sendmessage', data);
};

export const SearchUser = async (data) => {
  return await Instance.get(`/search?key=${data}`);
};

export const fetchUserDetails = async () => {
  return await Instance.get('/fetchUser');
};
