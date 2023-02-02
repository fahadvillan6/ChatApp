import { Types } from 'mongoose';
import Chat from '../Models/ChatModel.js';
import User from '../Models/UserModel.js';
import { comparePassword, hashPassword } from '../Utils/Hash.js';
import CreateToken from '../Utils/Jwt.js';

export const doLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exist = await User.findOne({ email: email }).select('+Password');
    if (!exist) return res.status(500).send('user-not-exist');
    const validPassword = await comparePassword(password, exist.Password);
    if (validPassword) {
      const token = CreateToken(email, exist._id);
      return res
        .cookie('token', token, {
          expires: new Date(Date.now() + 5 * 3600000),
        })
        .send({ success: true, Name: exist.Name, id: exist._id, token });
    }
    res.status(500).send('password incorrect');
  } catch (error) {
    res.status(500).send('some thing went wrong');
  }
};

export const doSignup = async (req, res) => {
  const { Name, Password, email } = req.body;
  try {
    const exist = await User.findOne({ email: email });
    if (exist) return res.send({ exist: true });
    const hashedPassword = await hashPassword(Password);
    if (hashedPassword) {
      new User({ Name, Password: hashedPassword, email })
        .save()
        .then((user) => {
          return res.json({ success: true });
        });
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.body._id } });
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

export const SearchUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const { key } = req.query;
    console.log(key, 'f');
    const Users = await User.find({
      $and: [
        { Name: { $regex: new RegExp(key), $options: 'si' } },
        { _id: { $ne: _id } },
      ],
    });
    console.log(Users);
    res.json(Users);
  } catch (error) {}
};

export const fetchUserDetails = async (req, res) => {
  try {
    const user = await User.findById(Types.ObjectId(req.body._id));
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
