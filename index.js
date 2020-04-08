import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import routes from './src/routes/ppmRoutes';
import helmet from 'helmet';
import { UserSchema } from './src/models/userModel';
import fetch from 'node-fetch';
const User = mongoose.model('User', UserSchema);

const app = express();
const PORT = 4000;
const secret = 'fszJTCkDVTwUo7m2SJdh';

app.use(helmet());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/ppm', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  if (req.headers && req.headers.token && req.headers && req.headers.username) {
    User.findOne({
      username: req.headers.username,
    }, (err, user) => {
      if (err) {
        throw err;
      }
      if (!user) {
        req.user = undefined;
      } else if (user) {
        if (user.verifyToken(req.headers.username, req.headers.token)) {
          req.user = { username: req.headers.username, token: req.headers.token, id: user._id };
          console.log('setting user');
        } else {
          req.user = undefined;
        }
      }
      next();
    });
  } else {
    req.user = undefined;
    console.log(req.user);
    next();
  }
});

routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`);
});
