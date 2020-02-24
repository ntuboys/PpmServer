import mongoose from 'mongoose';
import { ShopSchema } from '../models/shopModel';
import { ItemSchema } from '../models/itemModel';

const Shop = mongoose.model('Shop', ShopSchema);

export const getShops = (req, res) => {
  Shop.find({}, (err, shops) => {
    if (err) {
      res.send(err);
    }
    const shopsRet = [];
    shops.map((shop) => {
      shop.users.map((shopUser) => {
        if (shopUser.id == req.user._id && shopUser.owner) {
          shopsRet.push(shop);
        }
      });
    });
    res.json(shopsRet);
  });
};

export const createNewShop = (req, res) => {
  console.log('creating new shop');
  const newShop = new Shop(req.body);
  console.log('creating shop: ');
  console.log(req.body);
  newShop.set('users', { id: req.user._id, owner: true });
  newShop.save((err, shop) => {
    if (err) {
      res.send(err);
    }
    res.json(shop);
  });
};

export const addToShopInventory = (req, res) => {
  // find shop to which to add from the url
  Shop.findById(req.params.shopId, (err, shop) => {
    if (err) {
      res.send(err);
    }
    shop.users.map((user, i) => {
      if (user.id == req.user._id) {
        shop.stock.push(req.body);
        res.json(shop);
      } else if (i === shop.users.length - 1) {
        res.send({ message: 'failed' });
      }
    });
  });
};
