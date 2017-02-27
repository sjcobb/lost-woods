/*
 *** WOODS JS ***
*/

//console.log(bottom_portal.link);

function checkWoods(object) {
  //console.log(object);
  //console.log(camera.position);

  var pos_edge = 13;
  var neg_edge = -13;

  /* KEY PICKUP */
  if (camera.position.z < -8) {
    //console.log("key picked up");
    if (hasKey == false) {
      scene.remove(keyMesh);
      updateInventory();
    }
  }

  /* TOP PORTAL */
  if (camera.position.z < neg_edge) {
    if (top_reset == true) {
      object.resetHero = true;
    } else if (hasKey == true) {
      window.location = top_portal.link + "/?hasKey=true"
    } else {
      window.location = top_portal.link;
    }
  }

  /* RIGHT PORTAL */
  if (camera.position.x > pos_edge) {
    if (right_reset == true) {
      object.resetHero = true;
    } else if (hasKey == true) {
      window.location = right_portal.link + "/?hasKey=true"
    } else {
      window.location = right_portal.link;
    }
  }

  /* BOTTOM PORTAL */
  if (camera.position.z > pos_edge) {
    if (bottom_reset == true) {
      object.resetHero = true;
    } else if (hasKey == true) {
      window.location = bottom_portal.link + "/?hasKey=true"
    } else {
      window.location = bottom_portal.link;
    }
  }

  /* LEFT PORTAL */
  if (camera.position.x < neg_edge) {
    if (left_reset == true) {
      object.resetHero = true;
    } else if (hasKey == true) {
      window.location = left_portal.link + "/?hasKey=true"
    } else {
      window.location = left_portal.link;
    }
  }

  /* RESET HERO */
  if (camera.position.z < neg_edge || camera.position.z > pos_edge || camera.position.x > pos_edge || camera.position.x < neg_edge) {
    console.log("reset ran");
    portalUpdate();
    song_reset = true;
    stopSongs();
    //updSongs();
    songBuilder();

    //object.resetHero = true;
  }

}