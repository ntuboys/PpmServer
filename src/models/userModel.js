import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
