"use strict";

var canvas;
var gl;

var theta = 0.0;
var theta1 = 0.0;
var u_baseColorLoc;

var u_prjMatrix;
var u_prjMatLoc;
var prjMatrix;
//var u_mvMatLoc, u_mvMatrix;
var index;
var hourMarkersMats = [];

var vertices = [[-0.622973333333,0.828643333333, 0.0], // 0
              [-0.266306666667,0.828643333333, 0.0],
              [-0.06964,0.51531, 0.0],
              [0.407026666667,0.51531, 0.0],
              [0.407026666667,0.591976666667, 0.0],
              [0.277026666667,0.59531, 0.0],
              [0.277026666667,0.828643333333, 0.0],
              [0.777026666667,0.828643333333, 0.0],
              [0.777026666667,0.59531, 0.0],
              [0.64036,0.594133333333, 0.0],
              [0.64036,0.517466666667, 0.0],
              [0.767026666667,0.508643333333, 0.0],
              [0.943693333333,0.32531, 0.0],
              [0.95036,-0.28469, 0.0],
              [0.76036,-0.478023333333, 0.0],
              [0.637026666667,-0.481356666667, 0.0],
              [0.637026666667,-0.81469,0.0],
              [0.40036,-0.818023333333, 0.0],
              [0.20036,-0.481356666667, 0.0],
              [-0.262973333333,-0.478023333333, 0.0],
              [-0.262973333333,-0.601356666667, 0.0],
              [-0.142973333333,-0.608023333333, 0.0],
              [-0.142973333333,-0.81469, 0.0],
              [-0.622973333333,-0.818023333333, 0.0],
              [-0.622973333333,-0.608023333333, 0.0],
              [-0.472973333333,-0.60018, 0.0],
              [-0.472973333333,-0.48018, 0.0],
              [-0.926306666667,-0.478023333333, 0.0],
              [-0.926306666667,-0.281356666667, 0.0],
              [-0.80964,-0.27469, 0.0],
              [-0.80964,0.301976666667, 0.0],
              [-0.926306666667,0.308643333333, 0.0],
              [-0.926306666667,0.50531, 0.0],
              [-0.46964,0.51531, 0.0],
              [-0.46964,0.591976666667, 0.0],
              [-0.622973333333,0.591976666667, 0.0],
              [-0.58964,0.30531, 0.0],
              [-0.47616,0.30531, 0.0],
              [-0.47616,-0.278023333333, 0.0],
              [-0.58964,-0.271356666667, 0.0],
              [-0.259493333333,0.301976666667, 0.0],
              [0.0805066666667,-0.278023333333, 0.0],
              [-0.259493333333,-0.27469, 0.0],
              [0.0570266666667,0.301976666667, 0.0],
              [0.407173333333,0.301976666667, 0.0],
              [0.407173333333,-0.27469, 0.0],
              [0.637173333333,0.30531, 0.0],
              [0.70036,0.30531, 0.0],
              [0.76036,0.23531, 0.0],
              [0.757026666667,-0.218023333333, 0.0],
              [0.70036,-0.281356666667, 0.0],
              [0.63384,-0.27469, 0.0] // 51
              ];

var triangle_index = [vertices[0],vertices[35],vertices[34],
                  vertices[0],vertices[34],vertices[1],
                  vertices[1], vertices[34],vertices[2],
                  vertices[34],vertices[2],vertices[33],
                  vertices[31],vertices[32],vertices[47],
                  vertices[32],vertices[11],vertices[47],
                  vertices[3],vertices[4],vertices[10],
                  vertices[4],vertices[9],vertices[10],
                  vertices[5],vertices[6],vertices[8],
                  vertices[6],vertices[7],vertices[8],
                  vertices[11],vertices[47],vertices[48],
                  vertices[11],vertices[12],vertices[48],
                  vertices[12],vertices[13],vertices[48],
                  vertices[13],vertices[48],vertices[49],
                  vertices[13],vertices[14],vertices[49],
                  vertices[14],vertices[49],vertices[50],
                  vertices[14],vertices[27],vertices[50],
                  vertices[50],vertices[27],vertices[28],
                  vertices[15],vertices[16],vertices[17],
                  vertices[15],vertices[17],vertices[18],
                  vertices[19],vertices[20],vertices[26],
                  vertices[20],vertices[25],vertices[26],
                  vertices[21],vertices[22],vertices[24],
                  vertices[22],vertices[23],vertices[24],
                  vertices[29],vertices[30],vertices[39],
                  vertices[30],vertices[39],vertices[36],
                  vertices[37],vertices[38],vertices[42],
                  vertices[37],vertices[40],vertices[42],
                  vertices[40],vertices[41],vertices[43],
                  vertices[41],vertices[43],vertices[45],
                  vertices[44],vertices[45],vertices[51],
                  vertices[44],vertices[51],vertices[46]
                    ];

var boundaries_outers = [vertices[35],vertices[0],
                        vertices[0],vertices[1],
                        vertices[1], vertices[2],
                        vertices[2], vertices[3],
                        vertices[3], vertices[4],
                        vertices[4], vertices[5],
                        vertices[5], vertices[6],
                        vertices[6], vertices[7],
                        vertices[7], vertices[8],
                        vertices[8], vertices[9],
                        vertices[9], vertices[10],
                        vertices[10], vertices[11],
                        vertices[11], vertices[12],
                        vertices[12], vertices[13],
                        vertices[13], vertices[14],
                        vertices[14], vertices[15],
                        vertices[15], vertices[16],
                        vertices[16], vertices[17],
                        vertices[17], vertices[18],
                        vertices[18], vertices[19],
                        vertices[19], vertices[20],
                        vertices[20], vertices[21],
                        vertices[21], vertices[22],
                        vertices[22], vertices[23],
                        vertices[23], vertices[24],
                        vertices[24], vertices[25],
                        vertices[25], vertices[26],
                        vertices[26], vertices[27],
                        vertices[27], vertices[28],
                        vertices[28], vertices[29],
                        vertices[29], vertices[30],
                        vertices[30], vertices[31],
                        vertices[31], vertices[32],
                        vertices[32], vertices[33],
                        vertices[33], vertices[34],
                        vertices[34], vertices[35] ];

var boundaries_inner_1 = [ vertices[36], vertices[39],
                        vertices[39], vertices[38],
                        vertices[38], vertices[37],
                        vertices[37], vertices[36]
                        ];
var boundaries_inner_2 = [vertices[40], vertices[41],
                          vertices[41], vertices[42],
                          vertices[40], vertices[42]
                        ];
var boundaries_inner_3 = [vertices[43], vertices[44],
                          vertices[44], vertices[45],
                          vertices[45], vertices[43]
                        ];
var boundaries_inner_4 = [vertices[46], vertices[47],
                          vertices[47], vertices[48],
                          vertices[48], vertices[49],
                          vertices[49], vertices[50],
                          vertices[50], vertices[51],
                          vertices[51], vertices[46]
                        ];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 0.9, 0.9, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    for (var i = 0; i < 96; i++) {
      vertices[i] = triangle_index[i];
    }

    // adding boundaries to the vertices array
    for (var i = 96; i < boundaries_outers.length + 96; i++) {
      vertices[i] = boundaries_outers[i-96];
    }
    index = vertices.length;
    for (var i = index; i < boundaries_inner_1.length + index; i++) {
      vertices[i] = boundaries_inner_1[i-index];
    }
    index = vertices.length;
    for (var i = index; i < boundaries_inner_2.length + index; i++) {
      vertices[i] = boundaries_inner_2[i-index];
    }
    index = vertices.length;
    for (var i = index; i < boundaries_inner_3.length + index; i++) {
      vertices[i] = boundaries_inner_3[i-index];
    }
    index = vertices.length;
    for (var i = index; i < boundaries_inner_4.length + index; i++) {
      vertices[i] = boundaries_inner_4[i-index];
    }

    // circle set up
    var p = vec3(0.0, 0.0, 0.0); // center of the circle
    vertices.push(p);
    var r = 3.3;
    var inc = Math.PI/36;

    for (theta = 0.0; theta < Math.PI*2-inc; theta += inc){
      if (theta == 0.0) {
        vertices.push(vec3(Math.cos(theta)*r, Math.sin(theta)*r, 0.0));
      }
      vertices.push(vec3(Math.cos(theta+inc)*r, Math.sin(theta+inc)*r, 0.0));
    }

    // square set up for the hours
    vertices.push(vec3(-1, -1, 0));
    vertices.push(vec3(-1, 0, 0));
    vertices.push(vec3(0, -1, 0));
    vertices.push(vec3(0, 0, 0));

    // Load the data into the GPU
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var a_vPositionLoc = gl.getAttribLocation( program, "a_vPosition" );
    gl.vertexAttribPointer( a_vPositionLoc, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( a_vPositionLoc );

    u_baseColorLoc = gl.getUniformLocation( program, "u_baseColor" );

    u_prjMatLoc = gl.getUniformLocation(program, "u_prjMatrix");
    //prjMatrix = ortho(-1, 1, -1, 1, -1, 1);
    //gl.uniformMatrix4fv(u_prjMatLoc, false, flatten(prjMatrix));
    //u_mvMatLoc = gl.getUniformLocation(program, "u_mvMatrix");

    render();
};

function render() {

    gl.clear( gl.COLOR_BUFFER_BIT );

    var outerMat = 0.25;
    var innnerMat = 0.235;
    var centerMat = 0.01;

    var sm, rm, ctm;

    // scaling for the outer circle
    ctm = mat4();
    sm = scalem(outerMat, outerMat, 1.0);
    ctm = mult(sm, ctm);

    var prjMatrix = ortho(-1, 1, -1, 1, -1, 1);
    ctm = mult(prjMatrix, ctm);

    gl.uniform3fv( u_baseColorLoc, vec3(201/255, 151/255, 0/255));
    gl.uniformMatrix4fv(u_prjMatLoc, false, flatten(ctm));

    gl.drawArrays( gl.TRIANGLE_FAN, 0, vertices.length );

    // scaling for the inner circle
    ctm = mat4();
    sm = scalem(innnerMat, innnerMat, 1.0);
    ctm = mult(sm, ctm);

    ctm = mult(prjMatrix, ctm);

    gl.uniform3fv( u_baseColorLoc, vec3(1.0, 1.0, 1.0));
    gl.uniformMatrix4fv(u_prjMatLoc, false, flatten(ctm));

    gl.drawArrays( gl.TRIANGLE_FAN, 0, vertices.length);

    // scaling for the ND
    ctm = mat4();
    sm = scalem(outerMat, outerMat, 1.0);
    ctm = mult(sm, ctm);

    ctm = mult(prjMatrix, ctm);
    gl.uniform3fv( u_baseColorLoc, vec3(12/255, 35/255, 64/255));
    gl.uniformMatrix4fv(u_prjMatLoc, false, flatten(ctm));
    gl.drawArrays( gl.TRIANGLES, 0, 96);

    // scaling for boundaries
    ctm = mat4();
    sm = scalem(outerMat, outerMat, 1.0);
    ctm = mult(sm, ctm);

    ctm = mult(prjMatrix, ctm);
    gl.uniform3fv( u_baseColorLoc, vec3(0,0,0));
    gl.uniformMatrix4fv(u_prjMatLoc, false, flatten(ctm));
    gl.drawArrays( gl.LINE_LOOP, 96, 72);
    gl.drawArrays( gl.LINE_LOOP, 168, 8);
    gl.drawArrays( gl.LINE_LOOP, 176, 6);
    gl.drawArrays( gl.LINE_LOOP, 182, 6);
    gl.drawArrays( gl.LINE_LOOP, 188, 10);

    // scaling for the smallest circle
    ctm = mat4();
    sm = scalem(centerMat, centerMat, 1.0);
    ctm = mult(sm, ctm);

    ctm = mult(prjMatrix, ctm);
    gl.uniform3fv( u_baseColorLoc, vec3(201/255, 151/255, 0/255));
    gl.uniformMatrix4fv(u_prjMatLoc, false, flatten(ctm));

    gl.drawArrays( gl.TRIANGLE_FAN, 200, 74 );

    // scaling the hours
    ctm = mat4();
    var scaling_x = 0.08;
    var scaling_y = 0.02;
    var tm, rm;

    for (var i = 0; i < 12; i++) {
      ctm = mat4();
      theta1 += 30;

      sm = scalem(scaling_x, scaling_y, 1.0);
      tm = translate(0.78, 0.0, 0.0);
      rm = rotateZ(theta1);

      ctm = mult(prjMatrix, ctm);
      ctm = mult(sm, ctm);
      ctm = mult(tm, ctm);
      ctm = mult(rm, ctm);

      gl.uniformMatrix4fv(u_prjMatLoc, false, flatten(ctm));

      gl.uniform3fv( u_baseColorLoc, vec3(12/255, 35/255, 64/255));
      gl.drawArrays( gl.TRIANGLE_STRIP, 274, 4);
    }

    // scaling the hours
    ctm = mat4();
    var scaling_x = 0.04;
    var scaling_y = 0.015;
    var tm, rm;

    for (var i = 0; i < 60; i++) {
      ctm = mat4();
      theta1 += 6;

      sm = scalem(scaling_x, scaling_y, 1.0);
      tm = translate(0.78, 0.0, 0.0);
      rm = rotateZ(theta1);

      ctm = mult(prjMatrix, ctm);
      ctm = mult(sm, ctm);
      ctm = mult(tm, ctm);
      ctm = mult(rm, ctm);

      gl.uniformMatrix4fv(u_prjMatLoc, false, flatten(ctm));

      gl.uniform3fv( u_baseColorLoc, vec3(12/255, 35/255, 64/255));
      gl.drawArrays( gl.TRIANGLE_STRIP, 274, 4);
    }

    // get the current time
    var currentTime = new Date();

    // get the current hout
    var currentHour = currentTime.getHours();

    // If the hour is larger than 12, subtract 12 to get the 12-hour format
    if (currentHour > 12) {
      currentHour -= 12;
    }

    // get the current minute
    var currentMinute = currentTime.getMinutes();

    // Get the current second
    var currentSecond = currentTime.getSeconds();

    // get the hour matrix
    ctm = mat4();
    scaling_x = 0.35;
    scaling_y = 0.02;

    var rotate_hour = -(currentHour + currentMinute / 60 + currentSecond / 3600 + 3) * 30;

    sm = scalem(scaling_x, scaling_y, 1.0);
    tm = translate(0.0, 0.0, 0.0);
    rm = rotateZ(rotate_hour);

    ctm = mult(prjMatrix, ctm);
    ctm = mult(sm, ctm);
    ctm = mult(tm, ctm);
    ctm = mult(rm, ctm);

    gl.uniformMatrix4fv(u_prjMatLoc, false, flatten(ctm));

    gl.uniform3fv( u_baseColorLoc, vec3(201/255, 151/255, 0/255));
    gl.drawArrays( gl.TRIANGLE_STRIP, 274, 4);

    // get the minute matrix
    ctm = mat4();
    scaling_x = 0.45;
    scaling_y = 0.015;

    var rotate_minute = -(currentMinute + currentSecond / 60 + 15) * 6;

    sm = scalem(scaling_x, scaling_y, 1.0);
    tm = translate(0.0, 0.0, 0.0);
    rm = rotateZ(rotate_minute);

    ctm = mult(prjMatrix, ctm);
    ctm = mult(sm, ctm);
    ctm = mult(tm, ctm);
    ctm = mult(rm, ctm);

    gl.uniformMatrix4fv(u_prjMatLoc, false, flatten(ctm));

    gl.uniform3fv( u_baseColorLoc, vec3(201/255, 151/255, 0/255));
    gl.drawArrays( gl.TRIANGLE_STRIP, 274, 4);

    // get the minute matrix
    ctm = mat4();
    scaling_x = 0.55;
    scaling_y = 0.01;

    var rotate_seconds = -(currentSecond+15) * 6;

    sm = scalem(scaling_x, scaling_y, 1.0);
    tm = translate(0.0, 0.0, 0.0);
    rm = rotateZ(rotate_seconds);

    ctm = mult(prjMatrix, ctm);
    ctm = mult(sm, ctm);
    ctm = mult(tm, ctm);
    ctm = mult(rm, ctm);

    gl.uniformMatrix4fv(u_prjMatLoc, false, flatten(ctm));

    gl.uniform3fv( u_baseColorLoc, vec3(201/255, 151/255, 0/255));
    gl.drawArrays( gl.TRIANGLE_STRIP, 274, 4);

    requestAnimationFrame(render);

}
