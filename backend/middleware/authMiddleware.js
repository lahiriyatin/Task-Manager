import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { sendErrorResponse } from '../utils/errorResponseUtil.js';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      sendErrorResponse(res, 401, 'Not authorized, token failed');
    }
  }

  if (!token) {
    sendErrorResponse(res, 401, 'Not authorized, no token');
  }
}
