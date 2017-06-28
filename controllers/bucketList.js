var express = require('express');
var app = express();
var bucketListRouter = express.Router();
var Place = require("../client/src/models/place.js")


var BucketListQuery = require('../db/bucketListQuery.js');
var query = new BucketListQuery();

bucketListRouter.get('/', function(req, res){
  query.all(function(places){
    res.json(places);
  })
});

bucketListRouter.post('/', function(req, res) {
  var newPlace = new Place({
    name: req.body.name,
    duration: req.body.duration
  });
  query.add(newPlace, function(allPlaces){
    res.json(allPlaces);
  });
});











module.exports = bucketListRouter;