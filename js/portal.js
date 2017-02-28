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

var top_portal,
    right_portal,
    bottom_portal,
    left_portal,
    top_reset = false,
    right_reset = false,
    bottom_reset = false,
    left_reset = false;

function portalUpdate() {

  var portal = {
    "fire_temple" : {
      "link": "https://sjcobb.github.io/fire-temple",
      "song": "assets/sounds/fire-temple.mp3",
      "volume": 80
    },
    "ice_cavern" : {
      "link": "https://sjcobb.github.io/ice-cavern",
      "song": "assets/sounds/ice-cavern.mp3",
      "volume": 50
    },
    "lake_hylia" : {
      "link": "https://sjcobb.github.io/lake-hylia",
      "song": "assets/sounds/lake-hylia.mp3",
      "volume": 70
    },
    "bat_cave" : {
      "link": "https://ybinstock.github.io/BatCave",
      "song": "assets/sounds/bats.mp3",
      "volume": 10
    },
    "a_blast" : {
      "link": "https://aframe.io/a-blast",
      "song": "assets/sounds/ablast.ogg",
      "volume": 8
    },
    "aurora" : {
      "link": "https://aurora.jam3.net/#!/",
      "song": "assets/sounds/aurora.mp3",
      "volume": 30
    },
    "plato" : {
      "link": "https://ybinstock.github.io/Platos-Cave",
      "song": "assets/sounds/plato-script.mp3",
      "volume": 30
    }
  };

  var lost_reset = {
    "song": "assets/sounds/lost-woods.mp3",
    "volume": 100
  };

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


  top_portal = randomProperty(portal);
  right_portal = randomProperty(portal);
  bottom_portal = randomProperty(portal);
  left_portal = randomProperty(portal);

  var reset_portal = Math.floor(Math.random()*4);
  switch (reset_portal) {
    case 0:
      top_portal = lost_reset;
      top_reset = true;
      break;
    case 1:
      right_portal = lost_reset;
      right_reset = true;
      break;
    case 2:
      bottom_portal = lost_reset;
      bottom_reset = true;
      break;
    case 3:
      left_portal = lost_reset;
      left_reset = true;
      break;
  }

  console.log("top: ");
  console.log(top_portal);
  console.log("right: ");
  console.log(right_portal);
  console.log("bottom: ");
  console.log(bottom_portal);
  console.log("left: ");
  console.log(left_portal);
}