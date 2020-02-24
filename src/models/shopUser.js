/* eslint-disable filenames/match-regex */
import mongoose from 'mongoose';

const { Schema } = mongoose;

export const ShopUser = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  owner: {
    type: Boolean,
    required: true,
  },
});
