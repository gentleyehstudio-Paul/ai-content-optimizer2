/**
 * Shader Registry for Animal Vision Modes
 * Contains vertex and fragment shaders for each animal vision type
 */

const VERTEX_SHADER = `#version 300 es
precision highp float;

in vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

// DOG VISION: Dichromatic (blue-yellow), lower saturation, motion-sensitive
const DOG_FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D u_image;
uniform float u_saturation;
uniform float u_brightness;
uniform float u_colorShift;

out vec4 outColor;

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(1280.0, 720.0);
  uv.y = 1.0 - uv.y;

  vec4 color = texture(u_image, uv);

  // Convert to luminance (dogs see mostly in blue-yellow)
  float lum = dot(color.rgb, vec3(0.299, 0.587, 0.114));

  // Simulate dichromatic vision (blue-yellow dominant)
  vec3 dogVision = mix(
    color.rgb,
    vec3(
      lum * (0.5 + u_colorShift * 0.3),
      lum * (0.5 + u_colorShift * 0.2),
      lum * (0.8 + u_colorShift * 0.2)
    ),
    u_saturation
  );

  dogVision *= u_brightness;

  outColor = vec4(dogVision, 1.0);
}`;

// CAT VISION: Enhanced night vision, high contrast, motion detection
const CAT_FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D u_image;
uniform float u_saturation;
uniform float u_brightness;
uniform float u_colorShift;

out vec4 outColor;

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(1280.0, 720.0);
  uv.y = 1.0 - uv.y;

  vec4 color = texture(u_image, uv);

  // Enhance blue-green wavelengths (cat night vision)
  vec3 catVision = vec3(
    color.r * 0.4,
    color.g * (0.9 + u_colorShift * 0.2),
    color.b * (0.95 + u_colorShift * 0.15)
  );

  // Increase contrast for motion detection
  float lum = dot(catVision, vec3(0.299, 0.587, 0.114));
  catVision = mix(catVision, vec3(lum), 1.0 - u_saturation);

  // Apply brightness boost for night vision
  catVision *= u_brightness;

  // High contrast edge enhancement
  catVision = mix(catVision, vec3(pow(lum, 0.8)), 0.2);

  outColor = vec4(catVision, 1.0);
}`;

// BIRD VISION: Tetrachromatic (UV sensitive), motion-optimized
const BIRD_FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D u_image;
uniform float u_saturation;
uniform float u_brightness;
uniform float u_uvSensitivity;

out vec4 outColor;

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(1280.0, 720.0);
  uv.y = 1.0 - uv.y;

  vec4 color = texture(u_image, uv);

  // Birds see UV spectrum - simulate with near-UV perception
  // Enhance violet and blue channels
  vec3 birdVision = vec3(
    color.r * (0.6 + u_uvSensitivity * 0.2),
    color.g * 0.9,
    color.b * (1.1 + u_uvSensitivity * 0.3)
  );

  // Simulate tetrachromatic color perception
  float uv_component = (color.b + color.r * 0.3) * u_uvSensitivity;
  birdVision += vec3(uv_component * 0.2, 0.0, uv_component * 0.4);

  // Apply saturation and brightness
  float lum = dot(birdVision, vec3(0.299, 0.587, 0.114));
  birdVision = mix(vec3(lum), birdVision, u_saturation);
  birdVision *= u_brightness;

  // Enhance flicker/motion sensitivity by adding slight temporal component
  birdVision += vec3(0.05 * sin(uv.x * 10.0));

  outColor = vec4(birdVision, 1.0);
}`;

// BEE VISION: UV focus, polarized light perception, compound eye effect
const BEE_FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D u_image;
uniform float u_saturation;
uniform float u_brightness;
uniform float u_uvSensitivity;

out vec4 outColor;

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(1280.0, 720.0);
  uv.y = 1.0 - uv.y;

  vec4 color = texture(u_image, uv);

  // Bees see UV, blue, and green (no red perception)
  vec3 beeVision = vec3(0.0, 0.0, 0.0);

  // UV simulation (normally invisible to humans)
  float uv_value = (color.b + color.g * 0.5) * u_uvSensitivity;

  // Bee color perception
  beeVision = vec3(
    uv_value * 0.8,
    color.g * (0.9 + u_uvSensitivity * 0.2),
    color.b * 1.1
  );

  // Simulate compound eye pixelation effect
  vec2 pixelSize = vec2(8.0, 8.0);
  vec2 pixelCoord = floor(uv * pixelSize) / pixelSize;
  vec3 pixelated = texture(u_image, pixelCoord).rgb;

  // Blend with compound eye effect
  float lum = dot(pixelated, vec3(0.299, 0.587, 0.114));
  beeVision = mix(beeVision, vec3(lum), 0.3);

  // Apply saturation
  lum = dot(beeVision, vec3(0.299, 0.587, 0.114));
  beeVision = mix(vec3(lum), beeVision, u_saturation);

  beeVision *= u_brightness;

  // Add polarization effect as subtle shimmer
  float polarization = sin(pixelCoord.x * 10.0) * sin(pixelCoord.y * 10.0) * 0.1;
  beeVision += vec3(polarization);

  outColor = vec4(beeVision, 1.0);
}`;

export function getShaderSource(mode) {
  const shaders = {
    dog: { vertexSource: VERTEX_SHADER, fragmentSource: DOG_FRAGMENT },
    cat: { vertexSource: VERTEX_SHADER, fragmentSource: CAT_FRAGMENT },
    bird: { vertexSource: VERTEX_SHADER, fragmentSource: BIRD_FRAGMENT },
    bee: { vertexSource: VERTEX_SHADER, fragmentSource: BEE_FRAGMENT },
  };

  const shader = shaders[mode];
  if (!shader) {
    throw new Error(`Unknown shader mode: ${mode}`);
  }

  return shader;
}

export const ANIMAL_MODES = [
  { id: 'dog', name: '🐕 Dog Vision', description: 'Dichromatic - Blue/Yellow' },
  { id: 'cat', name: '🐱 Cat Vision', description: 'Night Vision Enhanced' },
  { id: 'bird', name: '🐦 Bird Vision', description: 'Tetrachromatic - UV Sensitive' },
  { id: 'bee', name: '🐝 Bee Vision', description: 'Compound Eyes - UV Polarization' },
];

export const SHADER_PARAMETERS = {
  dog: [
    { name: 'saturation', min: 0, max: 1, step: 0.05, label: 'Color Saturation' },
    { name: 'brightness', min: 0.5, max: 2, step: 0.1, label: 'Brightness' },
    { name: 'colorShift', min: 0, max: 1, step: 0.05, label: 'Color Shift' },
  ],
  cat: [
    { name: 'saturation', min: 0, max: 1, step: 0.05, label: 'Saturation' },
    { name: 'brightness', min: 0.5, max: 2.5, step: 0.1, label: 'Night Vision Boost' },
    { name: 'colorShift', min: 0, max: 1, step: 0.05, label: 'Green Channel' },
  ],
  bird: [
    { name: 'saturation', min: 0, max: 1.5, step: 0.05, label: 'Color Saturation' },
    { name: 'brightness', min: 0.5, max: 2, step: 0.1, label: 'Brightness' },
    { name: 'uvSensitivity', min: 0, max: 2, step: 0.1, label: 'UV Sensitivity' },
  ],
  bee: [
    { name: 'saturation', min: 0, max: 1, step: 0.05, label: 'Color Saturation' },
    { name: 'brightness', min: 0.5, max: 2, step: 0.1, label: 'Brightness' },
    { name: 'uvSensitivity', min: 0.5, max: 2, step: 0.1, label: 'UV Perception' },
  ],
};
