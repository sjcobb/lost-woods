/*
 *** PORTAL JS ***
*/
/*
"https://aframe.io/a-blast"
"https://ybinstock.github.io/BatCave"
"https://ybinstock.github.io/Platos-Cave"
"http://ybinstock.github.io/carmensandiego_360", "assets/sounds/carmen_audio_ending.mp3"
"https://ybinstock.github.io/starstuff"
"https://aurora.jam3.net/#!"
*/
var portal = {
  "fire_temple" : {
    "link": "https://sjcobb.github.io/fire-temple",
    "song": "assets/sounds/fire-temple.mp3",
    "volume": 100
  },
  "ice_cavern" : {
    "link": "https://sjcobb.github.io/ice-cavern",
    "song": "assets/sounds/ice-cavern.mp3",
    "volume": 40
  },
  "bat_cave" : {
    "link": "https://ybinstock.github.io/BatCave",
    "song": "assets/sounds/bats.mp3",
    "volume": 10
  },
  "a_blast" : {
    "link": "https://aframe.io/a-blast",
    "song": "assets/sounds/ablast.ogg",
    "volume": 10
  },
  "aurora" : {
    "link": "https://aurora.jam3.net/#!/",
    "song": "assets/sounds/aurora.mp3",
    "volume": 20
  }
};
//console.log(portal);

//http://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
var randomProperty = function (obj) {
    //delete obj.fire_temple;
    var keys = Object.keys(obj);
    var rdm_key = keys.length * Math.random() << 0;
    var rdm_portal = obj[keys[rdm_key]];
    //console.log(rdm_key);
    //console.log(obj[keys[rdm_key]]);
    delete obj[keys[rdm_key]];
    return rdm_portal;
};


//console.log(portal);
var top_portal = randomProperty(portal);
var right_portal = randomProperty(portal);
var bottom_portal = randomProperty(portal);
var left_portal = randomProperty(portal);
//console.log(portal);

console.log("top: ");
console.log(top_portal);
console.log("right: ");
console.log(right_portal);
console.log("bottom: ");
console.log(bottom_portal);
console.log("left: ");
console.log(left_portal);