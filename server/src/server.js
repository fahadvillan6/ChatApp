import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { createServer } from 'http';
import cors from 'cors';
import CookieParser from 'cookie-parser';
import mongoose from './mongoConnection.js';
import Socket from './socket.js';
import router from './Routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use(CookieParser());
const server = createServer(app);
Socket(server);
app.use(
  cors({
    origin: [process.env.CLIENT, ',http://localhost:5173'],
    credentials: true,
  })
);

app.use('/', router);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening to ${port}`));
