import mongoose from 'mongoose';
import { ShopSchema } from '../models/shopModel';
import { ItemSchema } from '../models/itemModel';

const Shop = mongoose.model('Shop', ShopSchema);

export const getShops = (req, res) => {
  Shop.find({}, (err, shops) => {
    if (err) {
      return res.status(500).json(err);
    }
    const shopsRet = [];
    shops.map((shop) => {
      shop.users.map((shopUser) => {
        if ((shopUser.id.toString() === req.user.id.toString()) && shopUser.owner) {
          shopsRet.push(shop);
        }
      });
    });
    return res.status(200).json(shopsRet);
  });
};

export const createNewShop = (req, res) => {
  const newShop = new Shop(req.body);
  newShop.set('users', { id: req.user.id, owner: true });
  newShop.save((err, shop) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(shop);
  });
};

export const addToShopInventory = (req, res) => {
  console.log('new item to shop')
  console.log(req.body)
  // find shop to which to add from the url
  if (!req.body.name || !req.body.description || !req.body.qnt || !req.body.price) {
    return res.status(500).json({ message: "name, desc, qnt, price required" })
  }
  Shop.findById(req.params.shopId, (err, shop) => {
    if (err) {
      return res.status(500).json(err);
    }
    shop.users.map((user, i) => {
      if (user.id.toString() === req.user.id.toString()) {
        for (const itemNo in shop.stock) {
          const item = shop.stock[itemNo];
          // if(!req.body.name || !req.body.desc || !req.body.price || !req.body.qnt) return res.json({message: 'new items require name, qnt, desc and price'});
          if (item.name.toString() === req.body.name.toString()) {
            return res.status(500).json({ message: 'Item already exists' });
          }
        }
        shop.stock.push(req.body);
        shop.save();
        return res.status(200).json(shop);
      }
      return res.status(401);
    });
  });
};

export const setQntOfItem = (req, res) => {
  Shop.findById(req.params.shopId, (err, shop) => {
    if (err) {
      res.status(500).json(err);
    }
    if (shop.isUserOwner(req.user.id)) {
      // TODO
    }
    return res.status(401);
  });
};

export const getAllInventory = (req, res) => {
  Shop.find({}, (err, result) => {
    let response = [];
    result.forEach(shop => {
      if (shop.stock.length > 0) {
        console.log(shop);
        response = response.concat({ shopName: shop.name, shopId: shop._id, shopStock: shop.stock });
      }
    })
    res.status(200).json(response);
  });
}

export const getItemFromInventory = (req, res) => {

};
