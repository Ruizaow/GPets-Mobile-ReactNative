import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const generateToken = (user) => {
  dotenv.config();
  
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
};
export default generateToken;