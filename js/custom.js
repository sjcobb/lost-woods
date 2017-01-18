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
vrControls.standing = true;
var fpVrControls = new THREE.FirstPersonVRControls(camera, scene);
// Optionally enable vertical movement.
fpVrControls.verticalMovement = true;


// Apply VR stereo rendering to renderer.
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);


// Add a repeating grid as a skybox.
var boxSize = 15;
//var boxSize = 20;
var loader = new THREE.TextureLoader();
loader.load('img/box.png', onTextureLoaded);
//loader.load('assets/textures/crate.gif', onTextureLoaded);
//loader.load('assets/mc-textures/leaves_big_oak_opaque.png', onTextureLoaded);

// load dirt texture, set wrap mode to repeat
var dirt_texture = new THREE.TextureLoader().load( "assets/textures/dirt.png" );
dirt_texture.wrapS = THREE.RepeatWrapping;
dirt_texture.wrapT = THREE.RepeatWrapping;
dirt_texture.repeat.set( 4, 4 );

/* see: https://threejs.org/docs/api/textures/Texture.html */
function onTextureLoaded(texture) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  //texture.repeat.set(boxSize, boxSize);
  texture.repeat.set( 5, 5 ); //how many times the texture is repeated across the surface, in each direction U and V

  var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  var material = new THREE.MeshBasicMaterial({
    map: dirt_texture,
    color: 0x01BE00,
    side: THREE.BackSide
  });

  // Align the skybox to the floor (which is at y=0).
  skybox = new THREE.Mesh(geometry, material);
  //skybox.position.y = boxSize/2;
  console.log(boxSize/2);
  skybox.position.y = 2.5; //grid box way above
  scene.add(skybox);

  // For high end VR devices like Vive and Oculus, take into account the stage parameters provided.
  setupStage();
}


// Create a VR manager helper to enter and exit VR mode.
var params = {
  hideButton: false, // Default: false.
  isUndistorted: false // Default: false.
};
var manager = new WebVRManager(renderer, effect, params);

// Create 3D objects.
var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);

var sign = new THREE.Mesh(geometry, material);

// Position cube mesh to be right in front of you.
//cube.position.set(0, controls.userHeight, -1);
cube.position.set(0, 3.5, -1); //move cube higher

// Add cube mesh to your three.js scene
scene.add(cube);

//sign.position.set(-2.25, 0.25, -2.5); //left-right, top-down, forward-back
sign.position.set(-4.75, 0.25, -4.75); //left-right, top-down, forward-back
scene.add(sign);

/*** NEW ***/
/*var crate_texture = new THREE.TextureLoader().load( 'assets/textures/crate.gif' );
var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
var material = new THREE.MeshBasicMaterial( { map: crate_texture } );
mesh = new THREE.Mesh( geometry, material );
mesh.position.set(0, 1.5, -1);
scene.add( mesh );*/

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