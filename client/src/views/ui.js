var Places = require('../models/places.js');

var UI = function(){
  var places = new Places();
  places.all(function(allPlaces){
    this.render(allPlaces)
  }.bind(this));
  this.attachFormOnSubmit();
}

UI.prototype = {

  attachFormOnSubmit: function(){
    var form = document.getElementById('new-place-form');
    form.addEventListener("submit", function(event){
      event.preventDefault();
      var name = form['name-field'].value;
      var duration = form['duration-field'].value;

      var placeToAdd = {
        name: name,
        duration: duration
      }

      var places = new Places();
      places.add(placeToAdd, function(newData){
        console.log('response in ui', newData)
      });
    });
  },
  render: function(allPlaces){
    var ul = document.getElementById("places-list");
    allPlaces.forEach(function(place){
      var listItem = document.createElement("li")
      listItem.innerText = place.name + "  :  " + place.duration
      ul.appendChild(listItem);
    })
  }






}

module.exports = UI;