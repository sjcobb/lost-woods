/*** NAVI ***/
var x = 0, y = 0;

var heartShape = new THREE.Shape();
heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );

var wing_g = new THREE.ShapeGeometry( heartShape );
var wing_m = new THREE.MeshBasicMaterial( { color: 0xD8EDED } );
var wing = new THREE.Mesh( wing_g, wing_m ) ;
var wing2 = new THREE.Mesh( wing_g, wing_m ) ;

wing.scale.set(.01, .01, .01);
//wing.rotation.x = 1.37;
wing.rotation.x = 1.50; //flip
wing.rotation.y = -0.5; //roll
wing.rotation.z = 5.0; //around
//wing.rotation.z = -1.0;
wing.position.y = 0.06;
wing.position.x = -0.3;

wing2.scale.set(.01, .01, .01);
wing2.rotation.x = 1.37;
wing2.rotation.z = 2.28;
wing2.position.x = 0.30;

var spriteMaterial = new THREE.SpriteMaterial({ 
  map: loader.load( 'http://lost-woods.com/assets/navi/glow.png' ), 
  useScreenCoordinates: false, 
  //alignment: THREE.SpriteAlignment.center,
  color: 0x0000ff, 
  transparent: false, 
  blending: THREE.AdditiveBlending
});
var sprite = new THREE.Sprite( spriteMaterial );
sprite.scale.set(0.7, 0.7, 1.0);

var navi_g = new THREE.SphereGeometry(0.15, 20, 20);
var navi_m = new THREE.MeshPhongMaterial({color: 0xD8EDED, transparent: true, opacity: 0.7, shininess: 30});

navi = new THREE.Mesh( navi_g, navi_m);
navi.add(sprite);
navi.add(wing);
navi.add(wing2);
navi.rotation.x = 0;
navi.rotation.y = 0.5;
navi.rotation.z = 0.3;
scene.add(navi);

var navi_sound = new THREE.PositionalAudio( listener );
audioLoader.load( 'http://lost-woods.com/assets/navi/OOT_Navi_Listen1.wav', function( buffer ) {
  navi_sound.setBuffer( buffer );
  navi_sound.setRefDistance( 0.03 );
  navi_sound.setVolume(100);
  //navi_sound.setLoop(true);
  navi_sound.play();
});
navi.add( navi_sound );

var rdm_shift = 0;
setInterval(function() {
  //rdm_shift = Math.random() - 0.2;
  rdm_shift = Math.random();
  //console.log(rdm_shift);
}, 3000);
setInterval(function() {
  navi_sound.play();
}, 18000);

function renderNavi() {
  var navi_shiftx = camera.position.x - 1.3 - rdm_shift;
  var navi_shifty = camera.position.y + 2 - rdm_shift;
  navi.position.set(navi_shiftx, navi_shifty, camera.position.z - 4);
}