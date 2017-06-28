var MongoClient = require('mongodb').MongoClient;

var BucketListQuery = function(){
  this.url = 'mongodb://localhost:27017/bucket_list';
}



BucketListQuery.prototype = {

  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if (err) return;
      var collection = db.collection('places');
      collection.find().toArray(function(err, docs){
        if (err) return;
        onQueryFinished(docs);
      });
    });
  },

  add: function(placeToAdd, onQueryFinished) {
    MongoClient.connect(this.url, function(err, db){
      if (err) return;
      var collection = db.collection('places');
      collection.insert(placeToAdd);
      collection.find().toArray(function(err, docs){
        if (docs) {
          onQueryFinished(docs);
        }
      });
    });
  }

}


module.exports = BucketListQuery;