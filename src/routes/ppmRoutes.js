import { getShops, createNewShop, getOrders, addToShopInventory, getItemFromInventory, setQntOfItem, getAllInventory, buyItem } from '../controllers/ppmControllers';
import { register, login, loginRequired, verifyToken } from '../controllers/userControllers';

const routes = (app) => {
  // create a new shop
  app.route('/shop/create')
    .post(loginRequired, createNewShop);

  // get all orders for a shop
  app.route('/shop/orders')
    .get(loginRequired, getOrders);

  // get all shops where the user is an owner route
  app.route('/shop/')
    .get(loginRequired, getShops);

  // set qnt of an item in inventory
  app.route('/shop/:shopId/inventory/:itemId/qnt/:qnt')
    .post(loginRequired, setQntOfItem);

  // get an item from the inventory
  app.route('/shop/:shopId/inventory/:itemId/')
    .get(loginRequired, getItemFromInventory);

  // add to shops inventory
  app.route('/shop/:shopId/inventory/add')
    .post(loginRequired, addToShopInventory);

  // get a token
  app.route('/auth/token')
    .post(loginRequired, verifyToken);

  // get all inventories of all shops
  app.route('/all/inventory')
    .get(loginRequired, getAllInventory);

  // buy item route
  app.route('/buy')
    .post(loginRequired, buyItem);

  // register route
  app.route('/auth/register')
    .post(register);

  // login route
  app.route('/auth/login')
    .post(login);
};

export default routes;
