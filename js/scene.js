/*
 *** SCENE JS ***
*/

// Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
// Only enable it if you actually need to.
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

var loader = new THREE.TextureLoader();
loader.load('assets/textures/ground.png', onTextureLoaded);

///////////////
// CONTROLS
///////////////
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

window.addEventListener('resize', onResize, true);
window.addEventListener('vrdisplaypresentchange', onResize, true);

///////////
// SOUND
///////////
portalUpdate();
songBuilder();

///////////
// FLOOR
///////////
var floorTexture = loader.load( 'assets/textures/ground.png' );
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
floorTexture.repeat.set( 2, 2 );
var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
var floorGeometry = new THREE.PlaneGeometry(60, 40, 4, 4); // e/w, n/s
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -4.8; //lower = floor lowers
floor.rotation.x = Math.PI / 2; // 1.57
scene.add(floor);

///////////
// WALLS
///////////
var wall_y_pos = -2.3;
//var wallTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/checkerboard.jpg' );
var wallTexture = loader.load( 'assets/textures/wall.png' );
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
wall1.position.z = -15;
var wall_rotation = 0.01;
scene.add(wall1);

/* Back Wall */
wall2.position.x = 0;
wall2.position.y = wall_y_pos;
wall2.position.z = 15;

scene.add(wall2);

/* Left Side Wall */
wall3.position.x = -15;
wall3.position.y = wall_y_pos;
wall3.position.z = 0;
wall3.rotation.y = Math.PI / 2;
scene.add(wall3);

/* Right Side Wall */
wall4.position.x = 15;
wall4.position.y = wall_y_pos;
wall4.position.z = 0;
wall4.rotation.y = Math.PI / 2;
scene.add(wall4);

/////////////
// OBJECTS
/////////////
// Create 3D objects.
var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
var sign = new THREE.Mesh(geometry, material);
cube.position.set(0, 3.5, -1);
sign.position.set(-4.75, 0.25, -4.75); //left-right, top-down, forward-back
//scene.add(cube);
//scene.add(sign);

/* BOSS KEY */
var keyTexture = loader.load( 'assets/items/key-gold.png' );
var keyMaterial = new THREE.SpriteMaterial( { map: keyTexture, color: 0xffffff } );
var keySprite = new THREE.Sprite( keyMaterial );
keySprite.position.set(0, -2, -10);
scene.add( keySprite );

// Items
/*sun = new Sun();
sun.Create(0, 200, 0, scene, renderer);
objects.push(sun);

var water = new Water();
water.Create(scene);
objects.push(water);*/


///////////////////
// LIGHT / MODEL
///////////////////
var ambientLight = new THREE.AmbientLight( 0x444444 );
scene.add( ambientLight );

var directionalLight = new THREE.DirectionalLight( 0xffeedd );
directionalLight.position.set( 0, 0, 1 ).normalize();
scene.add( directionalLight );

//var pointLight = new THREE.PointLight(0xffffff);
//scene.add( pointLight );

///////////
// SKYBOX
///////////
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
  var texture = loader.load(path);
  var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
  return material; 
}
function onTextureLoaded(texture) {
  loadSkyBox();
  setupStage(); // For high end VR devices like Vive and Oculus, take into account the stage parameters provided.
}

////////////////
// ANIMATION 
////////////////
var lastRender = 0;
function animate(timestamp) {
  var delta = Math.min(timestamp - lastRender, 500);
  lastRender = timestamp;

  cube.rotation.y += delta * 0.0006;

  renderNavi();
  
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
function setupStage() {
  //get the HMD and if we're dealing with something that specifies stageParameters, rearrange the scene
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

}