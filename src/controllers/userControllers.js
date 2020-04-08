import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const verifyToken = (req, res) => res.status(200).json({ message: 'valid' });

export const register = (req, res) => {
  User.count({ username: req.body.username }, (err, count) => {
    if (err) {
      throw err;
    }
    if (count > 0) {
      res.status(500).json({ message: 'Username already exists' });
    } else {
      if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ message: 'Username, password and email required' });
      }
      const newUser = new User(req.body);
      newUser.passwordHash = bcrypt.hashSync(req.body.password, 10);
      newUser.save((err, user) => {
        if (err) {
          return res.status(400).json(err);
        }
        user.passwordHash = undefined;
        return res.status(200).json(user);
      });
    }
  });
};

export const login = (req, res) => {
  console.log(req.body);
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!user) {
      res.status(401).json({ message: 'User not found' });
    } else if (user) {
      if (user.comparePassword(req.body.password, user.passwordHash)) {
        return res.json({ token: user.generateToken() });
      }
      return res.status(401).json({ message: 'Incorrect password' });
    }
  });
};

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
