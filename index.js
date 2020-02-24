import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import routes from './src/routes/ppmRoutes';
import helmet from 'helmet';

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
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], secret, (err, decode) => {
      if (err) {
        req.user = undefined;
      }
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`);
});
