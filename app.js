/* global __dirname, process */
const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './client/build')));

app.use('/', indexRouter);
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server Started!');
});

module.exports = app;
