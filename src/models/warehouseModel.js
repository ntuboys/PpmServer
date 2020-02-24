import mongoose from 'mongoose';

const { Schema } = mongoose;

export const WarehouseModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  users: {
    id: {
      type: Schema.Types.ObjectId,
    },
    owner: {
      type: Boolean,
    },
  },
  orders: {
    id: {
      type: Schema.Types.ObjectId,
      unique: true,
    },
    items: {
      
    },
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});
