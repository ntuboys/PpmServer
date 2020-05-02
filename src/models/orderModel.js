import mongoose from 'mongoose';
import { ItemSchema } from './itemModel';

const { Schema } = mongoose;

export const OrderSchema = new Schema({
  status: {
    type: String,
    required: true,
    enum: ['processing', 'shipped', 'arrived'],
  },
  /*
  items: [{
    itemId: {
      type: String,
      required: true,
    }
  }],
  */
  itemId: {
    type: String,
    required: true,
  }
});
