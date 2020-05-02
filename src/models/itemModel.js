import mongoose from 'mongoose';

const { Schema } = mongoose;

export const ItemSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  qnt: {
    type: Number,
  },
});
