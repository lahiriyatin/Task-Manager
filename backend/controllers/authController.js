import { hashPassword, comparePassword } from '../utils/hashPasswordUtil.js';
import { generateJWT } from '../utils/jwtUtil.js';
import { sendErrorResponse } from '../utils/errorResponseUtil.js';
import { sendSuccessResponse } from '../utils/responseUtil.js';
import { validateEmail, validatePassword } from '../utils/validateUtil.js';
import User from '../models/userModel.js';

// User Registration
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return sendErrorResponse(res, 400, "Please provide all required fields");
  }

  if (!validateEmail(email)) {
    return sendErrorResponse(res, 400, "Invalid email format");
  }

  if (!validatePassword(password)) {
    return sendErrorResponse(res, 400, "Password must contain at least 8 characters, including one uppercase letter and one number");
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendErrorResponse(res, 400, "User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = generateJWT(user._id);

    sendSuccessResponse(res, { token });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendErrorResponse(res, 400, "Please provide all required fields");
  }

  if (!validateEmail(email)) {
    return sendErrorResponse(res, 400, "Invalid email format");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return sendErrorResponse(res, 400, "Invalid email or password");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, 400, "Invalid email or password");
    }

    const token = generateJWT(user._id);

    sendSuccessResponse(res, { token });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
}
