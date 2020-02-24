import { getShops, createNewShop, addToShopInventory } from '../controllers/ppmControllers';
import { register, login, loginRequired } from '../controllers/userControllers';

const routes = (app) => {
  // create a new shop
  app.route('/shop/create')
    .post(loginRequired, createNewShop);

  // get shop inventory route
  app.route('/shop/')
    .get(loginRequired, getShops);

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
