import { Router } from 'express';
import { createRoom ,CreateMessage, fetchMessages} from '../Controllers/chatController.js';
import { doSignup, doLogin, getUsers } from '../Controllers/userController.js';
import auth from '../Middlewars/auth.js';

const router = Router();
router.post('/login', doLogin);
router.post('/register', doSignup);
router.get('/users', auth, getUsers);
router.post('/room', auth, createRoom);
router.post('/sendmessage',auth,CreateMessage)
router.get('/messages/:id',auth,fetchMessages)

export default router;
