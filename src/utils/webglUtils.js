/**
 * WebGL 2.0 Utilities for Animal Vision Simulator
 * Handles shader compilation, program linking, and frame rendering
 */

export function initWebGL(canvas) {
  const gl = canvas.getContext('webgl2', {
    antialias: false,
    alpha: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: true
  });

  if (!gl) {
    throw new Error('WebGL 2.0 not supported in this browser');
  }

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return gl;
}

export function compileShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compilation error: ${info}`);
  }

  return shader;
}

export function createShaderProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = compileShader(gl, vertexSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, fragmentSource, gl.FRAGMENT_SHADER);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program linking error: ${info}`);
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
}

export function createFullscreenQuad(gl) {
  const positions = new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
     1,  1,
  ]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  return buffer;
}

export function renderFrame(gl, program, texture, parameters) {
  gl.useProgram(program);

  // Set up vertex data
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
     1,  1,
  ]);

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Bind texture
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const samplerLocation = gl.getUniformLocation(program, 'u_image');
  gl.uniform1i(samplerLocation, 0);

  // Set shader parameters
  setShaderParameters(gl, program, parameters);

  // Draw fullscreen quad
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  // Cleanup
  gl.deleteBuffer(positionBuffer);
}

function setShaderParameters(gl, program, parameters) {
  const paramNames = Object.keys(parameters);

  paramNames.forEach(name => {
    const location = gl.getUniformLocation(program, `u_${name}`);
    if (location !== -1) {
      const value = parameters[name];
      if (typeof value === 'number') {
        gl.uniform1f(location, value);
      } else if (Array.isArray(value)) {
        if (value.length === 2) {
          gl.uniform2f(location, value[0], value[1]);
        } else if (value.length === 3) {
          gl.uniform3f(location, value[0], value[1], value[2]);
        } else if (value.length === 4) {
          gl.uniform4f(location, value[0], value[1], value[2], value[3]);
        }
      }
    }
  });
}

export function getWebGLExtensions(gl) {
  return {
    oes_texture_float: gl.getExtension('OES_texture_float'),
    oes_texture_float_linear: gl.getExtension('OES_texture_float_linear'),
    ext_color_buffer_float: gl.getExtension('EXT_color_buffer_float'),
  };
}
