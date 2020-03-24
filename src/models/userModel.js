import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import randomstring from 'randomstring';

const { Schema } = mongoose;

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  tokens: {
    type: [ String ],
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.comparePassword = (password, passwordHash) => bcrypt.compareSync(password, passwordHash);
UserSchema.methods.generateToken = function generateToken() {
  const token = randomstring.generate({
    length: 100,
    charset: 'alphanumeric',
  });
  this.tokens.push(token);
  this.save();
  return token;
};
UserSchema.methods.verifyToken = function verifyToken(username, token) {
  if (username === this.username && this.tokens.includes(token)) {
    return true;
  }
  return false;
};
