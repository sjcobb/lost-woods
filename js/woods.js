/*
 *** WOODS JS ***
*/

//console.log(bottom_portal.link);

function checkWoods(object) {
  //console.log(object);
  //console.log(camera.position);

  /* KEY PICKUP */
  if (camera.position.z < -8) {
    //console.log("key picked up");
    if (hasKey == false) {
      scene.remove(keyMesh);
      updateInventory();
    }
  }

  /* TOP PORTAL */
  if (camera.position.z < -12) {
    if (top_reset == true) {
      object.resetHero = true;
    } else if (hasKey == true) {
      window.location = top_portal.link + "/?hasKey=true"
    } else {
      window.location = top_portal.link;
    }
  }

  /* RIGHT PORTAL */
  if (camera.position.x > 12) {
    if (right_reset == true) {
      object.resetHero = true;
    } else if (hasKey == true) {
      window.location = right_portal.link + "/?hasKey=true"
    } else {
      window.location = right_portal.link;
    }
  }

  /* BOTTOM PORTAL */
  if (camera.position.z > 12) {
    if (bottom_reset == true) {
      object.resetHero = true;
    } else if (hasKey == true) {
      window.location = bottom_portal.link + "/?hasKey=true"
    } else {
      window.location = bottom_portal.link;
    }
  }

  /* LEFT PORTAL */
  if (camera.position.x < -12) {
    if (left_reset == true) {
      object.resetHero = true;
    } else if (hasKey == true) {
      window.location = left_portal.link + "/?hasKey=true"
    } else {
      window.location = left_portal.link;
    }
  }

  /* RESET HERO */
  if (camera.position.z < -12 || camera.position.z > 12 || camera.position.x > 12 || camera.position.x < -12) {
    object.resetHero = true;
  }

}