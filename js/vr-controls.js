/**
 * THANKS GUYS!!!
 * @author brianpeiris / http://brian.peiris.io/
 *
 * Based on code from THREE.FirstPersonControls
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */

THREE.FirstPersonVRControls = function ( camera, scene ) {
  var ZAXIS = new THREE.Vector3(0, 0, 1);
  var YAXIS = new THREE.Vector3(0, 1, 0);  

  this.object = new THREE.Object3D();

  this.enabled = true;
  this.verticalMovement = false;
  this.movementSpeed = 1.0;
  this.angle = 0;
  
  this.angleQuaternion = new THREE.Quaternion();

  this.moveForward = false;
  this.moveBackward = false;
  this.moveLeft = false;
  this.moveRight = false;

  this.resetHero = false;
  
  if (navigator.getVRDevices) {
    navigator.getVRDevices().then(function (devices){
      this.sensor = devices.find(function (device) { 
        return device instanceof PositionSensorVRDevice; 
      });
    }.bind(this));
  }

  this.onMouseDown = function ( event ) {
    //console.log("mouse down");
    checkWoods(this);
    this.moveForward = true;
  }

  this.onMouseUp = function ( event ) {
    //console.log("mouse up");
    checkWoods(this);
    this.moveForward = false;
  }

  this.onTouchStart = function ( event ) {
    //console.log("touch start");
    checkWoods(this);
    this.moveForward = true;
  }

  this.onTouchEnd = function ( event ) {
    //console.log("touch end");
    checkWoods(this);
    this.moveForward = false;
  }


  this.onKeyDown = function ( event ) {

    checkWoods(this);

    switch ( event.keyCode ) {
      case 38: /*up*/
      case 87: /*W*/ this.moveForward = true; break;

      case 37: /*left*/
      case 65: /*A*/ this.moveLeft = true; break;

      case 40: /*down*/
      case 83: /*S*/ this.moveBackward = true; break;

      case 39: /*right*/
      case 68: /*D*/ this.moveRight = true; break;

      case 82: /*R*/ this.moveUp = true; break;
      case 70: /*F*/ this.moveDown = true; break;
    }

  };

  this.onKeyUp = function ( event ) {

    checkWoods(this);

    switch ( event.keyCode ) {
      case 38: /*up*/
      case 87: /*W*/ this.moveForward = false; break;

      case 37: /*left*/
      case 65: /*A*/ this.moveLeft = false; break;

      case 40: /*down*/
      case 83: /*S*/ this.moveBackward = false; break;

      case 39: /*right*/
      case 68: /*D*/ this.moveRight = false; break;
        
      case 81: /*Q*/ this.snap('left'); break;
      case 69: /*E*/ this.snap('right'); break;

      case 82: /*R*/ this.moveUp = false; break;
      case 70: /*F*/ this.moveDown = false; break;
    }

  };

  var SNAP_ANGLE = 30 * Math.PI / 180; 
  this.snap = function (direction) {
    this.angle += SNAP_ANGLE * (direction === 'left' ? 1 : -1);
    this.angleQuaternion.setFromAxisAngle(YAXIS, this.angle);
  };

  var setFromQuaternionYComponent = function (dest, source) {
    var direction = ZAXIS.clone();
    direction.applyQuaternion(source);
    direction.sub(YAXIS.clone().multiplyScalar(direction.dot(YAXIS)));
    direction.normalize();
    dest.setFromUnitVectors(ZAXIS, direction);
  };

  var lastTimestamp = 0;  
  this.update = function( timestamp ) {
    if ( !this.enabled ) return;

    camera.quaternion.multiplyQuaternions(this.angleQuaternion, camera.quaternion);    
    setFromQuaternionYComponent(this.object.quaternion, camera.quaternion);
    
    var delta = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
    var actualMoveSpeed = delta * this.movementSpeed;
    
    if ( this.moveForward ) this.object.translateZ( - actualMoveSpeed );
    if ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );

    if ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );
    if ( this.moveRight ) this.object.translateX( actualMoveSpeed );

    if ( this.verticalMovement && this.moveUp ) this.object.translateY( actualMoveSpeed );
    if ( this.verticalMovement && this.moveDown ) this.object.translateY( - actualMoveSpeed );

    var hasPosition = this.sensor && this.sensor.getState().hasPosition;
    var vrCameraPosition;
    if (hasPosition) {
      vrCameraPosition = camera.position.clone();
      vrCameraPosition.applyQuaternion(this.angleQuaternion);
    }
    camera.position.copy(this.object.position); //important
    if (hasPosition) {
      camera.position.add(vrCameraPosition);
    }

    /*** NEW ***/
    if (this.resetHero) {
      var resetOptions = ["top", "right", "bottom", "left"];
      var resetPick = resetOptions[Math.floor(Math.random()*resetOptions.length)];
      console.log("Reset to: " + resetPick);
      //console.log(camera);
      //console.log(camera.getWorldDirection());

      //try: http://gamedev.stackexchange.com/questions/29662/how-to-rotate-an-object-so-it-stands-correctly-back-always-facing-the-camera
      switch (resetPick) {
        case "top": 
          this.object.position.z = -10;
          this.object.position.x = 0;
          this.angle = 3.14;
          break;
        case "right":
          this.object.position.z = 0;
          this.object.position.x = 10;
          this.angle = 1.57;
          break;
        case "bottom":
          this.object.position.z = 10;
          this.object.position.x = 0;
          this.angle = 0;
          break;
        case "left":
          this.object.position.z = 0;
          this.object.position.x = -10;
          //this.angle = 2.355;
          this.angle = 1.57;
          break;
      }
      /* Stage Transitions */
      //console.log(this.angleQuaternion); 
      //this.angleQuaternion.x = 0.5;  //narrow
      //this.angleQuaternion.z = -1; //sideways, upside down when w=0
      //this.angleQuaternion.z = 0;
      //this.angleQuaternion.y = 0;
      //this.angleQuaternion.w = 0;
      //this.movementSpeed = 1; //slowmo

      //console.log(this.angle);
      this.angleQuaternion.setFromAxisAngle(YAXIS, this.angle);

      //camera.rotation.set(0, 0, 0);
      //camera.rotation.z = 0;

      this.resetHero = false;
    }

  };

  this.dispose = function() {

    window.removeEventListener( 'keydown', _onKeyDown, false );
    window.removeEventListener( 'keyup', _onKeyUp, false );

    window.removeEventListener( 'mousedown', _onMouseDown, false );
    window.removeEventListener( 'mouseup', _onMouseUp, false );

    window.removeEventListener( 'touchstart', _onTouchStart, false );
    window.removeEventListener( 'touchend', _onTouchEnd, false );

  };
  
  var _onKeyDown = this.onKeyDown.bind(this);
  var _onKeyUp = this.onKeyUp.bind(this);

  var _onMouseDown = this.onMouseDown.bind(this);
  var _onMouseUp = this.onMouseUp.bind(this);

  var _onTouchStart = this.onTouchStart.bind(this);
  var _onTouchEnd = this.onTouchEnd.bind(this);

  window.addEventListener( 'keydown', _onKeyDown, false );
  window.addEventListener( 'keyup', _onKeyUp, false );

  window.addEventListener( 'mousedown', _onMouseDown, false );
  window.addEventListener( 'mouseup', _onMouseUp, false );

  window.addEventListener( 'touchstart', _onTouchStart, false );
  window.addEventListener( 'touchend', _onTouchEnd, false );
};
