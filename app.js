const express = require('express');
const app = express();
// const morgan = require('morgan');// dont need after all, because we use mongoose
// const bodyParser = require('body-parser'); // express now has built-in parser
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local');
const checkAuth = require('./api/middlewares/auth');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');


// app.use(morgan('dev')); // dont need after all, because we use mongoose
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})

// handling routes requests
app.use('/products', checkAuth, productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
