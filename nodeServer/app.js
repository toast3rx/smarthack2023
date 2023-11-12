const express = require('express');
const morgan = require('morgan');
const songRouter = require('./routes/songRoutes');
const cors = require('cors');
const app = express();

/// 1) MIDDLEWARES
app.use(cors({
  origin: 'https://www.section.io'
}));
app.use(cors({
  origin: '*'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.timestamp = new Date().toISOString();
  next();
});

app.use('/api/v1/songs', songRouter);

module.exports = app;
