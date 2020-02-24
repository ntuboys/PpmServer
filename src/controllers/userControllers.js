import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const register = (req, res) => {
  const newUser = new User(req.body);
  console.log(`pass: ${req.body.password}`)
  newUser.passwordHash = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      user.passwordHash = undefined;
      return res.json(user);
    }
  });
};

export const login = (req, res) => {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'User not found' });
    } else if (user) {
      if (!user.comparePassword(req.body.password, user.passwordHash)) {
        res.status(401).json({ message: 'Incorrect password' });
      } else {
        return res.json({ token: jsonwebtoken.sign({ email: user.email, username: user.username, _id: user.id }, 'fszJTCkDVTwUo7m2SJdh') });
      }
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
