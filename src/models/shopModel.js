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
