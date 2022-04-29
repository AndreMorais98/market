var express = require('express');
var router = express.Router();

const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , serverUrl: serverUrl, appId: appId});
});

module.exports = router;
