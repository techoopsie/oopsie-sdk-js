const express = require('express');

const app = express();

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

app.use(nocache);

app.use(express.static('public'))
app.use(express.static('../dist'))
app.listen(3001);