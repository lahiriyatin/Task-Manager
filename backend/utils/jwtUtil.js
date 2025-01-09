import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const generateJWT = (userId) => {
  return jwt.sign({ id: userId }, config.JWT_SECRET, { expiresIn: '30d' });
};
