
function checkWoods(object) {
  //console.log(object);
  //console.log(camera.position);
  if (camera.position.z > 12) { //bottom
    window.location = "https://sjcobb.github.io/ice-cavern/";
  }
  if (camera.position.x < -12) { //left
    if (hasKey == true) {
      window.location = "https://sjcobb.github.io/fire-temple/?hasKey=true";
      //window.location = "http://fire.dev/?hasKey=true";
    } else {
      window.location = "https://sjcobb.github.io/fire-temple/";
    }

  }
  if (camera.position.x > 12) { //right
    //window.location = "https://aframe.io/a-blast";
    window.location = "https://ybinstock.github.io/BatCave/";
    //window.location = "https://ybinstock.github.io/Platos-Cave/";
    //window.location = "http://ybinstock.github.io/carmensandiego_360/";
    //window.location = "https://ybinstock.github.io/starstuff/";
  }
  if (camera.position.z < -8) { //top
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