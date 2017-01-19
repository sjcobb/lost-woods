/*
 *** CUSTOM JS ***
*/

// Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
// Only enable it if you actually need to.
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene.
var scene = new THREE.Scene();

// Create a three.js camera.
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

var controls = new THREE.VRControls(camera);
controls.standing = true; //raise user above ground

/*** VR Controls ***/
// https://github.com/brianpeiris/three-firstperson-vr-controls
// https://brian.peiris.io/three-firstperson-vr-controls/demo/
// Create VRControls in addition to FirstPersonVRControls.
var vrControls = new THREE.VRControls(camera);
//vrControls.standing = true;
var fpVrControls = new THREE.FirstPersonVRControls(camera, scene);
// Optionally enable vertical movement.
fpVrControls.verticalMovement = true;
fpVrControls.movementSpeed = 5; //normal
fpVrControls.movementSpeed = 10;

// Apply VR stereo rendering to renderer.
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);


// Add a repeating grid as a skybox.
var boxSize = 40;
//var boxSize = 20;
var loader = new THREE.TextureLoader();
loader.load('img/box.png', onTextureLoaded);
//loader.load('assets/textures/crate.gif', onTextureLoaded);
//loader.load('assets/mc-textures/leaves_big_oak_opaque.png', onTextureLoaded);
var dirt_texture = new THREE.TextureLoader().load( "assets/textures/dirt.png" );

/* see: https://threejs.org/docs/api/textures/Texture.html */
function onTextureLoaded(texture) {
  //texture.wrapS = THREE.RepeatWrapping;
  //texture.wrapT = THREE.RepeatWrapping;
  //texture.repeat.set(boxSize, boxSize);
  //texture.repeat.set( 5, 5 ); //how many times the texture is repeated across the surface, in each direction U and V

  var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  var material = new THREE.MeshBasicMaterial({
    map: dirt_texture,
    //map: texture,
    color: 0x01BE00,
    //side: THREE.BackSide //inside 
    //side: THREE.FrontSide //outsiWde (nothing / default)
    side: THREE.DoubleSide //both
  });

  // Align the skybox to the floor (which is at y=0).
  skybox = new THREE.Mesh(geometry, material);
  //skybox.position.y = boxSize/2;
  skybox.position.y = 2.5; //grid box way above
  //scene.add(skybox);

  // For high end VR devices like Vive and Oculus, take into account the stage parameters provided.
  setupStage();
}

///////////
// FLOOR //
///////////
// note: 4x4 checkboard pattern scaled so that each square is 25 by 25 pixels.
//var floorTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/checkerboard.jpg' );
var floorTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/dirt.png' );
//floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
floorTexture.repeat.set( 1, 1 );
// DoubleSide: render texture on both sides of mesh
var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
var floorGeometry = new THREE.PlaneGeometry(60, 40, 1, 1); // e/w, n/s
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
//floor.position.y = -0.5;
floor.position.y = -4.8; //lower = floor lowers
floor.rotation.x = Math.PI / 2; // 1.57
scene.add(floor);

///////////
// WALL //
///////////
var wall_y_pos = -2.3;
//var wallTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/checkerboard.jpg' );
var wallTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/wall.png' );
wallTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
wallTexture.repeat.set( 1, 1 );
// DoubleSide: render texture on both sides of mesh
var wallMaterial = new THREE.MeshBasicMaterial( { map: wallTexture, side: THREE.DoubleSide } );
var wallGeometry = new THREE.PlaneGeometry(60, 40, 1, 1); // e/w, n/s
//var wallGeometry = new THREE.PlaneGeometry(600, 40, 1, 1); // extended
var wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
var wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
var wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
//floor.position.y = -0.5;
/* Front Wall */
wall1.position.x = 0;
wall1.position.y = wall_y_pos;
wall1.position.z = -15; //further away
var wall_rotation = 0.01;
console.log(wall_rotation);
//wall1.rotation.x = wall_rotation;
scene.add(wall1);
/* Back Wall */
wall2.position.x = 0;
wall2.position.y = wall_y_pos;
wall2.position.z = 15; //further away
//wall2.rotation.x = wall_rotation;
scene.add(wall2);
/* Left Side Wall */
wall3.position.x = -15;
wall3.position.y = wall_y_pos;
wall3.position.z = 0; //further away
//wall3.rotation.x = wall_rotation;
//wall3.rotation.y = 2;
wall3.rotation.y = Math.PI / 2;
scene.add(wall3);
/* Right Side Wall */
wall4.position.x = 15;
wall4.position.y = wall_y_pos;
wall4.position.z = 0; //further away
wall4.rotation.y = Math.PI / 2;
scene.add(wall4);

// Create a VR manager helper to enter and exit VR mode.
var params = {
  hideButton: false, // Default: false.
  isUndistorted: false // Default: false.
};
var manager = new WebVRManager(renderer, effect, params);

/////////////
// OBJECTS //
/////////////
// Create 3D objects.
var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
var sign = new THREE.Mesh(geometry, material);
//cube.position.set(0, controls.userHeight, -1);
cube.position.set(0, 3.5, -1); //move cube higher
scene.add(cube);
//sign.position.set(-2.25, 0.25, -2.5); //left-right, top-down, forward-back
sign.position.set(-4.75, 0.25, -4.75); //left-right, top-down, forward-back
scene.add(sign);


///////////
// SOUND //
///////////
var listener = new THREE.AudioListener();
camera.add( listener );

// sound spheres
//var sphere = new THREE.SphereGeometry( 5, 8, 4 );
var sphere = new THREE.SphereGeometry( 2.5, 4, 2 );
material_sphere1 = new THREE.MeshPhongMaterial( { color: 0xffaa00, shading: THREE.FlatShading, shininess: 0 } );
material_sphere2 = new THREE.MeshPhongMaterial( { color: 0xff2200, shading: THREE.FlatShading, shininess: 0 } );
material_sphere3 = new THREE.MeshPhongMaterial( { color: 0x6622aa, shading: THREE.FlatShading, shininess: 0 } );

var audioLoader = new THREE.AudioLoader();

var mesh1 = new THREE.Mesh( sphere, material_sphere1 );
mesh1.position.set(0, 2.5, -20);
scene.add( mesh1 );
var sound1 = new THREE.PositionalAudio( listener );
audioLoader.load( 'assets/sounds/lost-woods.mp3', function( buffer ) {
  sound1.setBuffer( buffer );
  sound1.setRefDistance( 2 );
  sound1.setVolume(0.5);
  sound1.setLoop(true);
  sound1.play();
});
mesh1.add( sound1 );

//

var mesh2 = new THREE.Mesh( sphere, material_sphere2 );
mesh2.position.set(0, 2.5, 20);
scene.add( mesh2 );

var sound2 = new THREE.PositionalAudio( listener );
audioLoader.load( 'assets/sounds/bolero-of-fire.mp3', function( buffer ) {
  sound2.setBuffer( buffer );
  sound2.setRefDistance( 2 );
  sound2.setVolume(0.5);
  sound2.setLoop(true);
  sound2.play();
});
mesh2.add( sound2 );

//

var mesh3 = new THREE.Mesh( sphere, material_sphere3 );
mesh3.position.set(20, 2.5, 0);
scene.add( mesh3 );

var sound3 = new THREE.PositionalAudio( listener );
audioLoader.load( 'assets/sounds/ice-cavern.mp3', function( buffer ) {
  sound3.setBuffer( buffer );
  sound3.setRefDistance( 2 );
  sound3.setVolume(0.1);
  sound3.setLoop(true);
  sound3.play();
});
mesh3.add( sound3 );

///////////////////
// LIGHT / MODEL //
///////////////////
var ambient = new THREE.AmbientLight( 0x444444 );
//var ambient = new THREE.AmbientLight( 0x101030 );
scene.add( ambient );

var directionalLight = new THREE.DirectionalLight( 0xffeedd );
directionalLight.position.set( 0, 0, 1 ).normalize();
scene.add( directionalLight );

var onProgress = function ( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

var onError = function ( xhr ) { };

THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( 'assets/models/ganondorf/' );
mtlLoader.load( 'model.mtl', function( materials ) {

  materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath( 'assets/models/ganondorf/' );
  objLoader.load( 'model.obj', function ( object ) {

    //object.scale.set(0.4, 0.4, 0.4);
    object.scale.set(0.5, 0.5, 0.5);
    //object.position.y = - 95;
    //object.position.set(0, 0, -5);
    object.position.set(0, -4.5, -5); //ganondorf on ground

    //object.material.emissive = new THREE.Color( 0.2, 0.2, 0.2 );

    scene.add( object );

  }, onProgress, onError );

});


window.addEventListener('resize', onResize, true);
window.addEventListener('vrdisplaypresentchange', onResize, true);

// Request animation frame loop function
var lastRender = 0;
function animate(timestamp) {
  var delta = Math.min(timestamp - lastRender, 500);
  lastRender = timestamp;

  // Apply rotation to cube mesh
  cube.rotation.y += delta * 0.0006;

  controls.update();
  // Render the scene through the manager.

  // Update FirstPersonControls after VRControls.
  // FirstPersonControls requires a timestamp.
  vrControls.update();
  fpVrControls.update(timestamp);

  manager.render(scene, camera, timestamp);
  effect.render(scene, camera);

  vrDisplay.requestAnimationFrame(animate);
}

function onResize(e) {
  effect.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

var vrDisplay;

// Get the HMD, and if we're dealing with something that specifies stageParameters, rearrange the scene.
function setupStage() {
  navigator.getVRDisplays().then(function(displays) {
    if (displays.length > 0) {
      vrDisplay = displays[0];
      if (vrDisplay.stageParameters) {
        setStageDimensions(vrDisplay.stageParameters);
      }
      vrDisplay.requestAnimationFrame(animate);
    }
  });
}

function setStageDimensions(stage) {
  /* not sure what this does... */
  // Make the skybox fit the stage.
  var material = skybox.material;
  scene.remove(skybox);

  // Size the skybox according to the size of the actual stage.
  var geometry = new THREE.BoxGeometry(stage.sizeX, boxSize, stage.sizeZ);
  skybox = new THREE.Mesh(geometry, material);

  // Place it on the floor.
  skybox.position.y = boxSize/2;
  scene.add(skybox);

  // Place the cube in the middle of the scene, at user height.
  cube.position.set(0, controls.userHeight, 0);
}