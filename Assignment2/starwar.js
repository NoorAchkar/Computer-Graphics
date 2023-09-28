"use strict";

var gl;
var vertices = [];
var xVelocity, yVelocity;
var xCenter, yCenter;
var extent = 0.05;
var u_vCenterLoc;
var rectangleBase;
var u_ColorLoc;
var baseWidth = 0.1;
var xCenterBase, yCenterBase;
var gameOver = false;
var remainingBullets = 100;
var bulletRadius = 0.025;
var bullets = [];
var currentBullet = null;
var bulletVertices = [];
var a_vPositionLoc;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    setup();

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );

    // Associate out shader variables with our data buffer
    a_vPositionLoc = gl.getAttribLocation( program, "a_vPosition" );
    gl.vertexAttribPointer( a_vPositionLoc, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( a_vPositionLoc );

    // associate the center with uniform shader variable
    u_vCenterLoc = gl.getUniformLocation (program, "u_vCenter");

    u_ColorLoc = gl.getUniformLocation(program, "u_color");

    document.getElementById("SpeedIncrease").onclick = function () {
      var currentSpeed = Math.sqrt(xVelocity * xVelocity + yVelocity * yVelocity);
      var scaleFactor = currentSpeed + 0.005;
      xVelocity = (xVelocity / currentSpeed) * scaleFactor;
      yVelocity = (yVelocity / currentSpeed) * scaleFactor;
    };

    document.getElementById("SpeedDecrease").onclick = function () {
      var currentSpeed = Math.sqrt(xVelocity * xVelocity + yVelocity * yVelocity);
      var scaleFactor = Math.max(currentSpeed - 0.0025, 0);
      xVelocity = (xVelocity / currentSpeed) * scaleFactor;
      yVelocity = (yVelocity / currentSpeed) * scaleFactor;
    };

    document.getElementById("BaseLeft").onclick = function () {
      if (!gameOver)
        xCenterBase -= 0.05;
    };

    document.getElementById("BaseRight").onclick = function () {
      if (!gameOver) {
        xCenterBase += 0.05;
      }
    };

    document.getElementById("Shoot").onclick = function () {
      if (0 < remainingBullets) {
          var bullet = {
            x: xCenterBase,
            y: -1.45,
          }
        bullets.push(bullet);
        currentBullet = bullet;
        remainingBullets--;
        document.getElementById("remaining-bullets").textContent = "Remaining Bullets: " + remainingBullets;
      }
      else {
        alert("Out of bullets!");
        gameOver = true;
      }
    };

    render();

};

function setup() {

    var p = vec2(0.0, 0.0); // center of the circle
    vertices.push(p);
    var r = 0.05;
    var inc = Math.PI/36;

    for (var theta = 0.0; theta < Math.PI*2-inc; theta += inc){
      if (theta ==0.0) {
        vertices.push(vec2(Math.cos(theta)*r, Math.sin(theta)*r));
      }
      vertices.push(vec2(Math.cos(theta+inc)*r, Math.sin(theta+inc)*r));
    }

    xCenter = 0;
    yCenter = 0.5;

    // check if xCenter/yCenter is out of bound (use extent),
    // if yes, keep it in bound
    if (xCenter+extent >= 1.0) {
      xCenter = 1.0-extent; //check against right wall
    }
    if (xCenter-extent <= -1.0) {
      xCenter = -1.0+extent; //check against left wall
    }
    if (yCenter+extent >= 1.0) {
      yCenter = 1.0-extent; //check against right wall
    }
    if (yCenter-extent <= -1.0) {
      yCenter = -1.0+extent; //check against left wall
    }

    // initial speed of the invader
    xVelocity = 0.005;
    yVelocity = -0.005;

    // base position
    xCenterBase = 0;
    yCenterBase = 0.5;

    rectangleBase = [
              vec2( 0, -1.5 ),
              vec2(  0,  -1.45 ),
              vec2( 0.1 , -1.45 ),
              vec2( 0.1, -1.5)
    ];

}

function animate () {

    // increment xCenter and yCenter
    xCenter += xVelocity;
    yCenter += yVelocity;

    // check if xCenter/yCenter is out of bound (use extent),
    // if yes, keep it in bound and reverse the xVelocity/yVelocity
    if (xCenter+extent >= 1.0) { //check against right wall
      xCenter = 1.0-extent;
      xVelocity = -xVelocity;
    }
    if (xCenter-extent <= -1.0) { //check against left wall
      xCenter = -1.0+extent;
      xVelocity = -xVelocity;
    }
    if (yCenter+extent >= 1.0) { //check against top wall
      yCenter = 1.0-extent;
      yVelocity = -yVelocity;
    }
    if (yCenter-extent <= -1.0) { //check against bottom wall
      yCenter = -1.0+extent;
      yVelocity = -yVelocity;
    }
}

function updateBulletPosition() {
    if (currentBullet) {
        currentBullet.y += 0.01;

        // Check if the bullet has collided with the invader
        if ((currentBullet.y + bulletRadius + 0.5) >= (yCenter - extent) &&
            (currentBullet.x - bulletRadius - 0.05) <= (xCenter + extent) &&
            (currentBullet.x + bulletRadius) >= (xCenter - extent) &&
            (currentBullet.y - bulletRadius + 0.5) <= (yCenter + extent)) {
            // Player wins
            gameOver = true;
            alert("Player Wins!");
        }
    }
}

function render() {

    // Ensure the base stays within the canvas boundaries
    if (!gameOver) {
      if (xCenterBase < -1.05) {
          xCenterBase = -1.05;
      } else if (xCenterBase > 1 - baseWidth / 2) {
          xCenterBase = 1 - baseWidth / 2;
      }

      // Check if the invader hit the base
      if ((yCenter - extent) < -0.95 && (xCenter - extent) < (xCenterBase+0.05) && (xCenter + extent) > (xCenterBase)) {
        gameOver = true;
        alert("Game Over!");
      }

      animate();

      gl.clear( gl.COLOR_BUFFER_BIT );

      // update xCenter/yCenter as uniform to shader
      gl.uniform2fv (u_vCenterLoc, vec2(xCenter, yCenter));
      gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
      gl.uniform4fv( u_ColorLoc, vec4(0.4, 0.4, 1.0, 1.0));
      gl.drawArrays( gl.TRIANGLE_FAN, 0, vertices.length );

      gl.uniform2fv (u_vCenterLoc, vec2(xCenterBase, yCenterBase));
      gl.bufferData( gl.ARRAY_BUFFER, flatten(rectangleBase), gl.STATIC_DRAW );
      gl.uniform4fv( u_ColorLoc, vec4(1.0, 0.4, 0.4, 1.0));
      gl.drawArrays( gl.TRIANGLE_FAN, 0, rectangleBase.length );

      updateBulletPosition()

      if (currentBullet) {
          var bulletVertices = [];

          for (var i = 0; i < 36; i++) {
              var angle = (i / 36) * 2 * Math.PI;
              var x = 0.05+ bulletRadius * Math.sin(angle);
              var y = currentBullet.y + bulletRadius * Math.cos(angle);
              bulletVertices.push(vec2(x, y));
          }

          gl.bufferData(gl.ARRAY_BUFFER, flatten(bulletVertices), gl.STATIC_DRAW);
          gl.uniform4fv(u_ColorLoc, vec4(0.2, 0.2, 0.2, 1.0));
          gl.drawArrays(gl.TRIANGLE_FAN, 0, bulletVertices.length);
      }

      requestAnimFrame(render);
  }
}
