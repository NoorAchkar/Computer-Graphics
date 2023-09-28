// Noor Maria Achkar
// Programming Assignment 1

"use strict";
var vertices;
var triangle_index;
var gl;
var u_scaleLoc;
var u_offsetXLoc;
var u_offsetYLoc;
var u_colorLoc;
var boundaries_outers;
var boundaries_inner_1, boundaries_inner_2, boundaries_inner_3, boundaries_inner_4;

window.onload = function init()
{
  var canvas = document.getElementById( "gl-canvas" );

  gl = WebGLUtils.setupWebGL( canvas );
  if ( !gl ) { alert( "WebGL isn't available" ); }

  vertices = [[-0.622973333333,0.828643333333], // 0
                [-0.266306666667,0.828643333333],
                [-0.06964,0.51531],
                [0.407026666667,0.51531],
                [0.407026666667,0.591976666667],
                [0.277026666667,0.59531],
                [0.277026666667,0.828643333333],
                [0.777026666667,0.828643333333],
                [0.777026666667,0.59531],
                [0.64036,0.594133333333],
                [0.64036,0.517466666667],
                [0.767026666667,0.508643333333],
                [0.943693333333,0.32531],
                [0.95036,-0.28469],
                [0.76036,-0.478023333333],
                [0.637026666667,-0.481356666667],
                [0.637026666667,-0.81469],
                [0.40036,-0.818023333333],
                [0.20036,-0.481356666667],
                [-0.262973333333,-0.478023333333],
                [-0.262973333333,-0.601356666667],
                [-0.142973333333,-0.608023333333],
                [-0.142973333333,-0.81469],
                [-0.622973333333,-0.818023333333],
                [-0.622973333333,-0.608023333333],
                [-0.472973333333,-0.60018],
                [-0.472973333333,-0.48018],
                [-0.926306666667,-0.478023333333],
                [-0.926306666667,-0.281356666667],
                [-0.80964,-0.27469],
                [-0.80964,0.301976666667],
                [-0.926306666667,0.308643333333],
                [-0.926306666667,0.50531],
                [-0.46964,0.51531],
                [-0.46964,0.591976666667],
                [-0.622973333333,0.591976666667],
                [-0.58964,0.30531],
                [-0.47616,0.30531],
                [-0.47616,-0.278023333333],
                [-0.58964,-0.271356666667],
                [-0.259493333333,0.301976666667],
                [0.0805066666667,-0.278023333333],
                [-0.259493333333,-0.27469],
                [0.0570266666667,0.301976666667],
                [0.407173333333,0.301976666667],
                [0.407173333333,-0.27469],
                [0.637173333333,0.30531],
                [0.70036,0.30531],
                [0.76036,0.23531],
                [0.757026666667,-0.218023333333],
                [0.70036,-0.281356666667],
                [0.63384,-0.27469] // 51
                ];

  triangle_index = [vertices[0],vertices[35],vertices[34],
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

  boundaries_outers = [vertices[35],vertices[0],
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

boundaries_inner_1 = [ vertices[36], vertices[39],
                vertices[39], vertices[38],
                vertices[38], vertices[37],
                vertices[37], vertices[36]
              ];
boundaries_inner_2 = [vertices[40], vertices[41],
                vertices[41], vertices[42],
                vertices[40], vertices[42]
              ];
boundaries_inner_3 = [vertices[43], vertices[44],
                vertices[44], vertices[45],
                vertices[45], vertices[43]
              ];
  boundaries_inner_4 = [vertices[46], vertices[47],
                vertices[47], vertices[48],
                vertices[48], vertices[49],
                vertices[49], vertices[50],
                vertices[50], vertices[51],
                vertices[51], vertices[46]
              ];

  gl.viewport( 0, 0, canvas.width, canvas.height );
  gl.clearColor( 0.8, 0.8, 0.8, 1.0 );

  var program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );

  var vBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(triangle_index), gl.STATIC_DRAW );
  var a_vPositionLoc = gl.getAttribLocation( program, "a_vPosition" );
  gl.vertexAttribPointer( a_vPositionLoc, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( a_vPositionLoc );

  u_scaleLoc = gl.getUniformLocation(program, "u_scale");
  u_offsetXLoc = gl.getUniformLocation(program, "u_offsetX");
  u_offsetYLoc = gl.getUniformLocation(program, "u_offsetY");
  u_colorLoc = gl.getUniformLocation(program, "u_color");

  render();

  var bBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, bBuffer );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(boundaries_outers), gl.STATIC_DRAW );
  gl.vertexAttribPointer( a_vPositionLoc, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( a_vPositionLoc );

  render_2();

  gl.bufferData( gl.ARRAY_BUFFER, flatten(boundaries_inner_1), gl.STATIC_DRAW );
  gl.vertexAttribPointer( a_vPositionLoc, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( a_vPositionLoc );

  render_3();

  gl.bufferData( gl.ARRAY_BUFFER, flatten(boundaries_inner_2), gl.STATIC_DRAW );
  gl.vertexAttribPointer( a_vPositionLoc, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( a_vPositionLoc );

  render_4();

  gl.bufferData( gl.ARRAY_BUFFER, flatten(boundaries_inner_3), gl.STATIC_DRAW );
  gl.vertexAttribPointer( a_vPositionLoc, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( a_vPositionLoc );

  render_4();

  gl.bufferData( gl.ARRAY_BUFFER, flatten(boundaries_inner_4), gl.STATIC_DRAW );
  gl.vertexAttribPointer( a_vPositionLoc, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( a_vPositionLoc );

  render_5();
};


function render() {
  gl.clear( gl.COLOR_BUFFER_BIT );
  // draw the data as an array of points
  var offsetx, offsety, scale;
  var count = 1;
  scale = 0.17;
  gl.uniform1f(u_scaleLoc, scale);

  for (offsetx = -0.8; offsetx < 1.0; offsetx += 0.4) {
    gl.uniform1f(u_offsetXLoc, offsetx);
    for (offsety = -0.8; offsety < 1.0; offsety += 0.5) {
      gl.uniform1f(u_offsetYLoc, offsety);
      // draw the data as an array of points
      if (count % 2 == 0) {
        gl.uniform3fv(u_colorLoc, vec3(12/255, 35/255, 64/255));
      }
      else {
        gl.uniform3fv(u_colorLoc, vec3(201/255, 151/255, 0/255));
      }
      gl.drawArrays( gl.TRIANGLES, 0, 96 );
      count++;
    }
    count++;
  }
}

function render_2() {
  var offsetx, offsety, scale;
  scale = 0.17;
  gl.uniform1f(u_scaleLoc, scale);

  for (offsetx = -0.8; offsetx < 1.0; offsetx += 0.4) {
    gl.uniform1f(u_offsetXLoc, offsetx);
    for (offsety = -0.8; offsety < 1.0; offsety += 0.5) {
      gl.uniform1f(u_offsetYLoc, offsety);
      gl.uniform3fv(u_colorLoc, vec3(0.0, 0.0, 0.0));
      gl.drawArrays( gl.LINE_LOOP, 0, 72 );
    }
  }
}

function render_3() {
  var offsetx, offsety, scale;
  scale = 0.17;
  gl.uniform1f(u_scaleLoc, scale);

  for (offsetx = -0.8; offsetx < 1.0; offsetx += 0.4) {
    gl.uniform1f(u_offsetXLoc, offsetx);
    for (offsety = -0.8; offsety < 1.0; offsety += 0.5) {
      gl.uniform1f(u_offsetYLoc, offsety);
      gl.uniform3fv(u_colorLoc, vec3(0.0, 0.0, 0.0));
      gl.drawArrays( gl.LINE_LOOP, 0, 8 );
    }
  }
}

function render_4() {
  var offsetx, offsety, scale;
  scale = 0.17;
  gl.uniform1f(u_scaleLoc, scale);

  for (offsetx = -0.8; offsetx < 1.0; offsetx += 0.4) {
    gl.uniform1f(u_offsetXLoc, offsetx);
    for (offsety = -0.8; offsety < 1.0; offsety += 0.5) {
      gl.uniform1f(u_offsetYLoc, offsety);
      gl.uniform3fv(u_colorLoc, vec3(0.0, 0.0, 0.0));
      gl.drawArrays( gl.LINE_LOOP, 0, 6 );
    }
  }
}

function render_5() {
  var offsetx, offsety, scale;
  scale = 0.17;
  gl.uniform1f(u_scaleLoc, scale);

  for (offsetx = -0.8; offsetx < 1.0; offsetx += 0.4) {
    gl.uniform1f(u_offsetXLoc, offsetx);
    for (offsety = -0.8; offsety < 1.0; offsety += 0.5) {
      gl.uniform1f(u_offsetYLoc, offsety);
      gl.uniform3fv(u_colorLoc, vec3(0.0, 0.0, 0.0));
      gl.drawArrays( gl.LINE_LOOP, 0, 10 );
    }
  }
}
