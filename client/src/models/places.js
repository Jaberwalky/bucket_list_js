var Places = function(){

}

Places.prototype = {
  all: function(onPlacesReady){
    this.makeRequest('http://localhost:3000/api/places', function(allPlaces){
      onPlacesReady(allPlaces)
    })
  },
  makeRequest: function(url, onRequestComplete){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function(){
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsData = JSON.parse(jsonString);
      onRequestComplete(resultsData);
    });
    request.send();
  },

  add: function(newPlace, callback){
    var jsonString = JSON.stringify(newPlace);
    this.makePostRequest('http://localhost:3000/api/places', callback, jsonString);
  },

  makePostRequest: function(url, onRequestComplete, payload){
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function(){
      var jsonString = request.responseText;
      var updatedPlaces = JSON.parse(jsonString);
      onRequestComplete(updatedPlaces);
    })
    request.send(payload);
  }


}

module.exports = Places;