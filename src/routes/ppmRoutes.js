import { getShops, createNewShop, addToShopInventory, getItemFromInventory, setQntOfItem } from '../controllers/ppmControllers';
import { register, login, loginRequired } from '../controllers/userControllers';

const routes = (app) => {
  // create a new shop
  app.route('/shop/create')
    .post(loginRequired, createNewShop);

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

  // register route
  app.route('/auth/register')
    .post(register);

  // login route
  app.route('/auth/login')
    .post(login);
};

export default routes;
