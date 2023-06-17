import jsonwebtoken from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { Request } from 'express';
import { User } from '../models/userModel';

export interface Decoded {
  token: string;
  id: string;
}

const protect = expressAsyncHandler(async (req: Request, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('token:', token);

      // Verify token
      const secret = (): string => {
        const newSecret = process.env.JWT_SECRET;
        if (typeof newSecret !== 'string') {
          throw new Error('JWT Secret invalid');
        } else return newSecret;
      };

      const decoded = jsonwebtoken.verify(token, secret()) as Decoded;

      // Get user from token
      const user = await User.findById(decoded.id).select('-password').lean();

      if (!user) {
        res.status(401);
        throw new Error('Not authorized');
      }

      req.user = user;

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }
});

export default protect;
