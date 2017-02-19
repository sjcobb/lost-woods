/*
 *** SCENE JS ***
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
// Create VRControls in addition to FirstPersonVRControls.
var vrControls = new THREE.VRControls(camera);
//vrControls.standing = true;
var fpVrControls = new THREE.FirstPersonVRControls(camera, scene);
//fpVrControls.verticalMovement = true;
fpVrControls.movementSpeed = 10;

// Apply VR stereo rendering to renderer.
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

// Create a VR manager helper to enter and exit VR mode.
var params = {
  hideButton: false, // Default: false.
  isUndistorted: false // Default: false.
};
var manager = new WebVRManager(renderer, effect, params);

/*** LOAD TEXTURES ***/
/*** SKYBOX: http://www.custommapmakers.org/skyboxes.php ***/
function loadSkyBox() {
  var materials = [
    createMaterial( 'assets/skybox/night-right.jpg' ), // right
    createMaterial( 'assets/skybox/night-left.jpg' ), // left
    createMaterial( 'assets/skybox/night-up.jpg' ), // top
    createMaterial( 'assets/skybox/night-down.jpg' ), // bottom
    createMaterial( 'assets/skybox/night-back.jpg' ), // back
    createMaterial( 'assets/skybox/night-front.jpg' )  // front
  ];
  var mesh = new THREE.Mesh( new THREE.BoxGeometry( 10000, 10000, 10000, 1, 1, 1 ), new THREE.MeshFaceMaterial( materials ) );
  mesh.scale.set(-1,1,1); // Set the x scale to be -1, this will turn the cube inside out
  scene.add( mesh );  
}
 
function createMaterial( path ) {
  var texture = THREE.ImageUtils.loadTexture(path);
  var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
  return material; 
}

var boxSize = 40;
var loader = new THREE.TextureLoader();
loader.load('img/box.png', onTextureLoaded);



function onTextureLoaded(texture) {
  loadSkyBox();
  setupStage(); // For high end VR devices like Vive and Oculus, take into account the stage parameters provided.
}

///////////
// FLOOR //
///////////
//var floorTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/grass.png' );
var floorTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/ground.png' );
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
floorTexture.repeat.set( 2, 2 );
var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
var floorGeometry = new THREE.PlaneGeometry(60, 40, 4, 4); // e/w, n/s
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
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
sign.position.set(-4.75, 0.25, -4.75); //left-right, top-down, forward-back

//scene.add(cube);
//scene.add(sign);

/* SILVER KEY */
//var keyTexture = new THREE.ImageUtils.loadTexture( 'assets/items/key-silver.png' );
var keyTexture = new THREE.ImageUtils.loadTexture( 'assets/items/key-gold.png' );
keyTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
keyTexture.repeat.set( 1, 1 );
// DoubleSide: render texture on both sides of mesh
var keyMaterial = new THREE.MeshBasicMaterial( { map: keyTexture, side: THREE.DoubleSide } );
var keyGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);

var keyMesh = new THREE.Mesh(keyGeometry, keyMaterial);
keyMesh.position.x = 0;
//keyMesh.position.y = -2.3;
keyMesh.position.y = -2;
keyMesh.position.z = -10;
//keyMesh.rotation.x = Math.PI / 2; //ceiling
//keyMesh.rotation.z = Math.PI / 2; //upside down
//keyMesh.rotation.z = -3.14 / 2; //left flip

scene.add(keyMesh);

///////////
// SOUND //
///////////
songBuilder();

///////////////////
// LIGHT / MODEL //
///////////////////
/*var ambient = new THREE.AmbientLight( 0x444444 );
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

    //scene.add( object );

  }, onProgress, onError );

});*/


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