var express = require('express');
var router = express.Router();

var json2csv = require('json2csv');
const fs = require('fs');

var parseUrl = require('body-parser')
let encodeUrl = parseUrl.urlencoded({ extended: false })

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

router.get('/create/step1', function(req, res) {
  res.render('step1', {serverUrl: serverUrl, appId: appId});
});

router.post('/step1' ,function(req, res) {
  var name = req.body.name
  var token = req.body.token
  var number = req.body.number
  var product = req.body.product
  var clothes = req.body.clothes

  var fields = [name, token, number, product, 'description', 'brand_id', 'product_id', 'made_in', 'color', 'composition'];
  var fieldNames = ['Name', 'Abreviation Token', 'Number', 'Product', 'Descrição', 'Brand ID', 'Product ID', 'Made In', 'Color', 'Composition'];
  
  if (product == "Watch"){
    fields.push('circumference', 'diameter', 'height', 'width');
    fieldNames.push('Circumference', 'Diameter', 'Height', 'Width');
  }
  else if (product == "Jewellery"){
    fields.push('circumference', 'length', 'width');
    fieldNames.push('Circumference', 'Length', 'Width');
  }
  else if (product == "Clothes"){
    fields.push(clothes, 'size');
    fieldNames.push('Clothes', 'Size');
  }
  else if (product == "Shoes"){
    fields.push('size');
    fieldNames.push('Size');
  }
  else if (product == "Bags"){
    fields.push('depth', 'handle', 'height', 'width');
    fieldNames.push('Depth', 'Handle', 'Height', 'Width');
  }
  var data = json2csv({ data: docs, fields: fields, fieldNames: fieldNames });
  res.attachment('filename.csv');
  res.status(200).send(data);
  res.redirect("/create/step2")
});

router.get('/create/step2', function(req, res) {
  res.render('step2', {serverUrl: serverUrl, appId: appId});
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
 