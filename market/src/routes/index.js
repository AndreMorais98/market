var express = require('express');
var router = express.Router();

const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', {serverUrl: serverUrl, appId: appId});
});

router.get('/profile', function(req, res,) {
  res.render('profile', {serverUrl: serverUrl, appId: appId});
});

router.get('/nft/:id', function(req, res,) {
  id = req.params.id
  res.render('nft', {serverUrl: serverUrl, appId: appId, id: id});
});


module.exports = router;
