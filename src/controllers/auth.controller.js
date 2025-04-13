import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';
import { generateAccessToken } from '../services/generateAccessToken.js'
import bcrypt from 'bcrypt';

const JWT_SECRET = config.security.JWT_SECRET;

export const registerUserController = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return errorResponse(res, 400, 'The email is already in use');

    const nameFound = await User.findOne({ username });
    if (nameFound) return errorResponse(res, 400, 'The username is already in use');

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash
    });

    const userSaved = await newUser.save();
    const token = await generateAccessToken({ id: userSaved._id, role: 'user' });

    return successResponse(res, 'You have registered successfully', {
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      token
    });
  } catch (error) {
    return errorResponse(res, 500, 'Internal Server Error', [{ message: error.message }]);
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound = await User.findOne({ email });
    if (!userFound) return errorResponse(res, 400, 'User not found');

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return errorResponse(res, 400, 'Incorrect Password');

    const token = await generateAccessToken({ id: userFound._id, role: 'user' });

    return successResponse(res, 'Login successful', {
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      token
    });
  } catch (error) {
    return errorResponse(res, 500, 'Internal Server Error', [{ message: error.message }]);
  }
};

export const verifyTokenController = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return errorResponse(res, 401, 'Authentication token is missing');

  jwt.verify(token, JWT_SECRET, async (error, decoded) => {
    if (error) return errorResponse(res, 403, 'Authentication token is invalid or expired');

    const { id, role } = decoded;
    let userData;

    userData = await User.findById(id);
    if (!userData) return errorResponse(res, 404, 'User not found');

    return successResponse(res, 'Verificado', {
      id: userData._id,
      username: userData.username || userData.bandName,
      email: userData.email,
    });
  });
};
