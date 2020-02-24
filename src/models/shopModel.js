/* eslint-disable filenames/match-regex */
import mongoose from 'mongoose';
import { ItemSchema } from './itemModel';
import { OrderSchema } from './orderModel';
import { ShopUser } from './shopUser';

const { Schema } = mongoose;

export const ShopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  users: [ ShopUser ],
  stock: [ ItemSchema ],
  orders: [ OrderSchema ],
  createDate: {
    type: Date,
    default: Date.now,
  },
});

ShopSchema.methods.checkUser = (user) => {
  return this.users.find(o => o.id == user);
};
