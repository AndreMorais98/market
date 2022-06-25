var express = require('express');
var router = express.Router();

const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', {serverUrl: serverUrl, appId: appId});
});

router.get('/profile', function(req, res) {
  res.render('profile', {serverUrl: serverUrl, appId: appId});
});

router.get('/edit', function(req, res) {
  res.render('edit', {serverUrl: serverUrl, appId: appId});
});

router.get('/create', function(req, res) {
  res.render('create', {serverUrl: serverUrl, appId: appId});
});

router.get('/market', function(req, res) {
  var search = req.query.search;
  var type_cloth = req.query.type_cloth;
  var max = req.query.max;
  var min = req.query.min;
  var order = req.query.order;
  res.render('market', {serverUrl: serverUrl, appId: appId});
});

router.get('/nft/:id', function(req, res) {
  id = req.params.id
  res.render('nft', {serverUrl: serverUrl, appId: appId, id: id});
});


module.exports = router;
