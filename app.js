const express = require('express');
const app = express();
const getRouters = require('./routes')
const path = require('path');
const config = require('./config/db')
const { onError } = require('./api/utils/helpers')

process.on('unhandledRejection', (error) => onError(error))
// process.on('error', (error) => onError(error))
// const morgan = require('morgan');// dont need after all, because we use mongoose
// const bodyParser = require('body-parser'); // express now has built-in parser
const mongoose = require('mongoose');
mongoose.connect(config.mongo.URL, { useNewUrlParser: true }).catch((err) => console.log(err))
mongoose.set('useCreateIndex', true);
const checkAuth = require('./api/middlewares/auth');

// app.use(morgan('dev')); // dont need after all, because we use mongoose
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
    return res.status(200).json();
  }
  next();
})

//serve static files
app.use(express.static(path.join(__dirname, '../chat-client/build')));

app.get('/', function(req, res) {
	console.log('TCL: get')
  res.sendFile(path.join(__dirname, '../chat-client/build', 'index.html'));
});

// handling routes requests
// app.use('/products', productRoutes); //  checkAuth,
// app.use('/orders', orderRoutes);
// app.use('/users', userRoutes);
getRouters(app)
app.use((req, res, next) => {
  const error = new Error('Resource not found.');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log('### EXPRESS ERROR MIDDLEWARE ###: ');
  res.status(error.status || 500);
  console.error(error.stack)
  res.json({
    error: true,
    success: false,
    message: error.message,
  });
});

module.exports = app;
