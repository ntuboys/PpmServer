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
        if ((shopUser.id.toString() === req.user.id.toString()) && shopUser.owner) {
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
  newShop.set('users', { id: req.user.id, owner: true });
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
    console.log(`looking for ${req.params.shopId}`);
    if (err) {
      res.send(err);
    }
    shop.users.map((user, i) => {
      if (user.id.toString() === req.user.id.toString()) {
        for (const itemNo in shop.stock) {
          const item = shop.stock[itemNo];
          //if(!req.body.name || !req.body.desc || !req.body.price || !req.body.qnt) return res.json({message: 'new items require name, qnt, desc and price'});
          if (item.name.toString() === req.body.name.toString()) {
            return res.json({ message: 'Item already exists' });
          }
        }
        shop.stock.push(req.body);
        shop.save();
        return res.json(shop);
      }
      return res.json({message: 'user not allowed to do this'});
    });
  });
};

export const setQntOfItem = (req, res) => {
  Shop.findById(req.params.shopId, (err, shop) => {
    if (err) throw err;
    if(shop.isUserOwner(req.user.id)) {
      // TODO 
    }
    return res.json({message: 'not allowed'});
  })
};

export const getItemFromInventory = (req, res) => {
  
};