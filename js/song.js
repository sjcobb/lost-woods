/*
 *** SONG JS ***
*/
var top_sound,
    right_sound,
    bottom_sound,
    left_sound;

function songBuilder() {
  var listener = new THREE.AudioListener();
  camera.add( listener );

  // sound spheres
  var sphere = new THREE.SphereGeometry( 2.5, 4, 2 );
  material_sphere1 = new THREE.MeshPhongMaterial( { color: 0xffaa00, shading: THREE.FlatShading, shininess: 0 } );

  var audioLoader = new THREE.AudioLoader();

  //top
  var top_mesh = new THREE.Mesh( sphere, material_sphere1 );
  top_mesh.position.set(0, 2.5, -20);
  scene.add( top_mesh );
  top_sound = new THREE.PositionalAudio( listener );
  audioLoader.load( top_portal.song, function( buffer ) {
    top_sound.setBuffer( buffer );
    top_sound.setRefDistance( 0.03 );
    top_sound.setVolume(top_portal.volume);
    top_sound.setLoop(true);
    top_sound.play();
  });
  top_mesh.add( top_sound );

  //right
  var right_mesh = new THREE.Mesh( sphere, material_sphere1 );
  right_mesh.position.set(20, 2.5, 0);
  scene.add( right_mesh );
  right_sound = new THREE.PositionalAudio( listener );
    audioLoader.load( right_portal.song, function( buffer ) {
    right_sound.setBuffer( buffer );
    right_sound.setRefDistance( 0.015 );
    right_sound.setVolume(right_portal.volume);
    right_sound.setLoop(true);
    right_sound.play();
  });
  right_mesh.add( right_sound );

  //bottom
  var bottom_mesh = new THREE.Mesh( sphere, material_sphere1 );
  bottom_mesh.position.set(0, 2.5, 20);
  scene.add( bottom_mesh );
  bottom_sound = new THREE.PositionalAudio( listener );
    audioLoader.load( bottom_portal.song, function( buffer ) {
    bottom_sound.setBuffer( buffer );
    bottom_sound.setRefDistance( 0.03 );
    bottom_sound.setVolume(bottom_portal.volume);
    bottom_sound.setLoop(true);
    bottom_sound.play();
  });
  bottom_mesh.add( bottom_sound );

  //left
  var left_mesh = new THREE.Mesh( sphere, material_sphere1 );
  left_mesh.position.set(-20, 2.5, 0);
  scene.add( left_mesh );
  left_sound = new THREE.PositionalAudio( listener );
    audioLoader.load( left_portal.song, function( buffer ) {
    left_sound.setBuffer( buffer );
    left_sound.setRefDistance( 0.015 );
    left_sound.setVolume(left_portal.volume);
    left_sound.setLoop(true);
    left_sound.play();
  });
  left_mesh.add( left_sound );
  
}