import { Router } from 'express';
import {
  createRoom,
  CreateMessage,
  fetchMessages,
  fetchChats,
} from '../Controllers/chatController.js';
import {
  doSignup,
  doLogin,
  getUsers,
  SearchUser,
  fetchUserDetails,
} from '../Controllers/userController.js';
import auth from '../Middlewars/auth.js';

const router = Router();
router.post('/login', doLogin);
router.post('/register', doSignup);
router.get('/users', auth, getUsers);
router.post('/room', auth, createRoom);
router.post('/sendmessage', auth, CreateMessage);
router.get('/messages/:id', auth, fetchMessages);
router.get('/chats', auth, fetchChats);
router.get('/search', auth, SearchUser);
router.get('/fetchUser', auth, fetchUserDetails);

export default router;
