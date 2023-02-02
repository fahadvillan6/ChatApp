import { verify } from 'jsonwebtoken';

export default function auth(req, res, next) {
  let { token } = req.headers || req.cookies;
  const { Token } = req.cookies;
  console.log(token);
  token = token || Token;
  verify(token, process.env.JWI_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.clearCookie('token').status(500).send('error');
    }
    req.body._id = decoded.userid;
    next();
  });
}
