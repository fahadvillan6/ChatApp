import Chat from '../Models/ChatModel.js';
import User from '../Models/UserModel.js';
import { comparePassword, hashPassword } from '../Utils/Hash.js';
import CreateToken from '../Utils/Jwt.js';

export const doLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exist = await User.findOne({ email: email }).select('+Password');
    if (!exist) return res.send({ exist: false });
    const validPassword = comparePassword(password, exist.Password);
    if (validPassword) {
      const token = CreateToken(email, exist._id);
      return res
        .cookie('token', token, {
          expires: new Date(Date.now() + 5 * 3600000),
          httpOnly: true,
        })
        .send({ exist: true, success: true, Name: exist.Name });
    }
    res.sendStatus(500);
  } catch (error) {
    res.sendStatus(500);
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
          return res.json('usercreated');
        });
    }
    res.sendStatus(500);
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
