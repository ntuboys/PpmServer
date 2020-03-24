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
ShopSchema.methods.isUserOwner = function isUserOwner(userId) {
  this.users.map((user, i) => {
    if (user._id.toString() === userId.toString()) {
      return true;
    }
    if (i === this.users.length - 1) {
      return false;
    }
  });
};
