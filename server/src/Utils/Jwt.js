import Jwt from 'jsonwebtoken';

export default function CreateToken(email, userid) {
  const token = Jwt.sign({ email, userid }, process.env.JWI_SECRET, {
    expiresIn: '2h',
  });
  return token;
}
