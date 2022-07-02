var express = require('express');
var router = express.Router();
var csvwriter = require('csv-writer');
const fs = require('fs');
require("dotenv-safe").config();
var parseUrl = require('body-parser')
let encodeUrl = parseUrl.urlencoded({ extended: false })
const Moralis = require("moralis/node");


const serverUrl = process.env.APP_MORALIS_SERVER_URL;
const appId = process.env.APP_MORALIS_APPLICATION_ID;
const masterKey = process.env.APP_MORALIS_MASTER_KEY;


/* GET home page. */
router.get('/', function(req, res) {
  // IMPLEMENTAR COOKIES
  res.render('index', {serverUrl: serverUrl, appId: appId, isLogged: isLogged});
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
  var product = req.body.product
  var clothes = req.body.clothes

  
  const headers = [
    {id: 'title', title: 'Title'},
    {id: 'description', title: 'Description'},
    {id: 'image', title: 'Image Name'},
    {id: 'brand_id', title: 'Brand ID'},
    {id: 'product_id', title: 'Product ID'},
    {id: 'made_in', title: 'Made In'},
    {id: 'color', title: 'Color'},
    {id: 'composition', title: 'Composition'},
  ]

  const records = []
  
  if (product == "Watch"){
    headers.push(
      {id: 'circumference', title: 'Circumference'},
      {id: 'diameter', title: 'Diameter'},
      {id: 'height', title: 'Height'},
      {id: 'width', title: 'Width'},
    )
  }
  else if (product == "Jewellery"){
    headers.push(
      {id: 'circumference', title: 'Circumference'},
      {id: 'length', title: 'Length'},
      {id: 'width', title: 'Width'},
    )
  }
  else if (product == "Clothes"){
    if (clothes == "Shirt/Coat") {
      headers.push(
        {id: 'size', title: 'Size'},
      )
    }
    else if(clothes == "Trousers/Shorts") {
      headers.push(
        {id: 'size', title: 'Size'},
      )
    }
    product = clothes
  }
  else if (product == "Shoes"){
    headers.push(
      {id: 'size', title: 'Size'},
    )
  }
  else if (product == "Bags"){
    headers.push(
      {id: 'depth', title: 'Depth'},
      {id: 'handle', title: 'Handle'},
      {id: 'height', title: 'Height'},
      {id: 'width', title: 'Width'},
    )
  }

  const url = "create/step2?token=" + token + "&name=" + name + "&product=" + product

  const createCsvWriter = csvwriter.createObjectCsvWriter({
    path: 'public/files/nft_collection_form.csv',
    header: headers,
  })

  createCsvWriter.writeRecords(records)
  .then(() => {
    res.redirect(url);
  });
});

router.get('/create/step2', function(req, res) {
  res.render('step2', {serverUrl: serverUrl, appId: appId});
});



router.get('/create/step3', function(req, res) {
  res.render('step3', {serverUrl: serverUrl, appId: appId});
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

async function isLogged(req,res,next) {
  Moralis.start({ serverUrl, appId });
  if (Moralis.User.current()){;
    next();
  }
  else {
    await Moralis.authenticate();
  }
}

module.exports = router;
 