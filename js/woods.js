console.log(portal.ice_cavern.link);


function checkWoods(object) {
  //console.log(object);
  //console.log(camera.position);
  if (camera.position.z > 12) { //BOTTOM
    if (hasKey == true) {
      window.location = portal.ice_cavern.link + "/?hasKey=true"
    } else {
      window.location = portal.ice_cavern.link;
    }
  }
  if (camera.position.x < -12) { //LEFT
    if (hasKey == true) {
      window.location = "https://sjcobb.github.io/fire-temple/?hasKey=true";
    } else {
      window.location = "https://sjcobb.github.io/fire-temple/";
    }
  }
  if (camera.position.x > 12) { //RIGHT
    window.location = "https://ybinstock.github.io/BatCave/";
  }
  if (camera.position.z < -8) { //TOP
    //console.log("key picked up");
    if (hasKey == false) {
      scene.remove(keyMesh);
      updateInventory();
    }
  }
  if (camera.position.z < -12 || camera.position.z > 12 || camera.position.x > 12 || camera.position.x < -12) {
    object.resetHero = true;
  }

}