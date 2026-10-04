# 🎯 Animal Vision WebGL Simulator - Implementation Guide

## Overview

This guide provides detailed technical information about the Animal Vision WebGL Simulator implementation, including architecture, component breakdown, shader specifications, and performance optimization strategies.

---

## 📐 Architecture Overview

### High-Level Data Flow

```
┌─────────────────────────────────────────────────────┐
│              App.jsx (State Manager)                │
│  Manages: mode, parameters, isActive, fps, error   │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
   VideoCapture  Control   Performance
   (WebGL)      Panel      Monitor
        │          │          │
        └──────────┼──────────┘
                   │
              User Feedback
```

### Component Responsibilities

| Component | Responsibility | Files |
|-----------|----------------|-------|
| **App.jsx** | Global state, mode switching, parameter management | `App.jsx`, `App.css` |
| **VideoCapture** | WebGL rendering, shader execution, video streaming | `VideoCapture.jsx`, `VideoCapture.css` |
| **ControlPanel** | UI controls, parameter sliders, mode selection | `ControlPanel.jsx`, `ControlPanel.css` |
| **PerformanceMonitor** | FPS tracking, memory monitoring, status display | `PerformanceMonitor.jsx`, `PerformanceMonitor.css` |
| **WebGL Utils** | Shader compilation, program linking, rendering | `webglUtils.js` |
| **Shader Registry** | GLSL code storage, animal vision algorithms | `shaderRegistry.js` |

---

## 🎬 Component Deep Dive

### 1. App.jsx (Main Container)

**Purpose**: Central state management and orchestration

**Key State Variables**:
```javascript
const [mode, setMode] = useState('dog');           // Current animal mode
const [isActive, setIsActive] = useState(false);   // Camera active state
const [fps, setFps] = useState(0);                 // FPS counter
const [parameters, setParameters] = useState({     // Per-mode params
  dog: { saturation: 0.3, brightness: 1.2, colorShift: 0.8 },
  cat: { saturation: 0.6, brightness: 1.5, colorShift: 0.6 },
  bird: { saturation: 1.0, brightness: 1.3, uvSensitivity: 1.2 },
  bee: { saturation: 0.8, brightness: 1.1, uvSensitivity: 1.5 }
});
const [error, setError] = useState(null);
```

**Props Flow**:
- → VideoCapture: `mode`, `isActive`, `parameters[mode]`, `onFpsUpdate`, `onError`
- → ControlPanel: `mode`, `parameters[mode]`, `onModeChange`, `onParameterChange`
- → PerformanceMonitor: `fps`, `mode`

---

### 2. VideoCapture.jsx (WebGL Renderer)

**Purpose**: Handle webcam input and GPU rendering

**Lifecycle**:

1. **useEffect 1 - WebGL Initialization**
   ```javascript
   // Runs once on mount
   - Get WebGL 2.0 context
   - Compile shaders
   - Create texture for video
   - Set texture parameters (clamping, filtering)
   ```

2. **useEffect 2 - Shader Recompilation**
   ```javascript
   // Runs when mode changes
   - Get new shader source for mode
   - Compile new program
   - Discard old program
   ```

3. **useEffect 3 - Camera Management**
   ```javascript
   // Runs when isActive changes
   - Request getUserMedia with HD constraints
   - Attach stream to video element
   - Clean up tracks on unmount
   ```

4. **renderLoop Function**
   ```javascript
   // Runs via requestAnimationFrame
   - Check video is ready
   - Resize canvas if needed
   - Upload video frame to texture
   - Execute fragment shader
   - Calculate FPS
   ```

**WebGL Rendering Pipeline**:

```glsl
// Vertex Shader (Simple 2D Quad)
gl_Position = vec4(a_position, 0.0, 1.0);

// Fragment Shader (Animal Vision Processing)
color = texture(u_image, uv);
color = applyAnimalVision(color, parameters);
outColor = vec4(color, 1.0);
```

**Performance Optimizations**:
- Single-pass rendering (no post-processing)
- Texture filtering on GPU only
- No CPU texture copies
- Efficient requestAnimationFrame usage
- Frame buffer reuse

---

### 3. webglUtils.js (GPU Infrastructure)

**Key Functions**:

#### `initWebGL(canvas)`
Initializes WebGL 2.0 context with optimal settings
```javascript
// Returns WebGL context with:
// - High-performance mode
// - Anti-aliasing disabled
// - Alpha disabled
// - Drawing buffer preserved
```

#### `compileShader(gl, source, type)`
Compiles individual vertex/fragment shader
```javascript
// Returns: shader object
// Throws: error with GLSL compilation details
```

#### `createShaderProgram(gl, vertexSource, fragmentSource)`
Links compiled shaders into executable program
```javascript
// Process:
// 1. Compile vertex shader
// 2. Compile fragment shader
// 3. Create program
// 4. Attach shaders
// 5. Link program
// 6. Verify link success
// 7. Delete individual shaders
```

#### `renderFrame(gl, program, texture, parameters)`
Executes single render pass
```javascript
// Process:
// 1. Setup vertex data (fullscreen quad)
// 2. Bind texture
// 3. Set uniform parameters
// 4. Draw triangle strip (2 triangles = 4 vertices)
// 5. Cleanup buffers
```

**Uniform Parameter Setting**:
```javascript
// Dynamically sets all uniforms from parameters object
for each param in parameters:
  uniform_location = gl.getUniformLocation("u_" + paramName)
  gl.uniform1f/2f/3f/4f(location, value)
```

---

### 4. shaderRegistry.js (Animal Vision Algorithms)

**Structure**:

```
VERTEX_SHADER
  ↓
  └─ Shared fullscreen quad vertex shader

ANIMAL_SHADERS
  ├─ DOG_FRAGMENT (Dichromatic)
  ├─ CAT_FRAGMENT (Night Vision)
  ├─ BIRD_FRAGMENT (Tetrachromatic UV)
  └─ BEE_FRAGMENT (Compound Eyes)

EXPORTS
  ├─ getShaderSource(mode)
  ├─ ANIMAL_MODES
  └─ SHADER_PARAMETERS
```

#### Dog Vision Shader
```glsl
// Simulates red-green color blindness (dichromatic)
// Blue-yellow sensitivity

KEY ALGORITHM:
1. Calculate luminance (weighted RGB)
2. Reduce red channel (0.5 value)
3. Enhance blue channel (0.8-1.0 value)
4. Mix saturation with original
5. Apply brightness

PARAMETERS:
- saturation: color intensity (0-1)
- brightness: luminance scaling (0.5-2)
- colorShift: red→yellow shift (0-1)
```

#### Cat Vision Shader
```glsl
// Enhanced night vision, motion-sensitive
// Blue-green dominant perception

KEY ALGORITHM:
1. Reduce red (0.4 value)
2. Boost green (0.9-1.1 value)
3. Boost blue (0.95-1.15 value)
4. Apply high contrast (edge enhancement)
5. Amplify brightness for night vision

PARAMETERS:
- saturation: color intensity (0-1)
- brightness: night vision boost (0.5-2.5)
- colorShift: green channel intensity (0-1)
```

#### Bird Vision Shader
```glsl
// Tetrachromatic - sees UV invisible to humans
// Extremely color-rich perception

KEY ALGORITHM:
1. Enhance red (0.6-0.8 value)
2. Maintain green (0.9 value)
3. Enhance blue (1.1-1.4 value)
4. Add artificial UV channel (0.2-0.4 value)
5. Simulate flicker sensitivity

PARAMETERS:
- saturation: color intensity (0-1.5)
- brightness: scene brightness (0.5-2)
- uvSensitivity: UV perception (0-2)
```

#### Bee Vision Shader
```glsl
// UV focus + compound eye pixelation
// No red perception

KEY ALGORITHM:
1. Zero red channel
2. Green at 0.9-1.1
3. Blue at 1.1 base
4. Add UV component (blue + green weighted)
5. Pixelate into compound eye grid (8px hexagons)
6. Add polarization shimmer

PARAMETERS:
- saturation: color intensity (0-1)
- brightness: overall brightness (0.5-2)
- uvSensitivity: UV perception (0.5-2)
```

---

## 🎨 Shader Details

### Fullscreen Quad Rendering

```glsl
// Vertex positions for triangle strip
positions = [-1, -1,  1, -1,  -1, 1,  1, 1]
           = [TL,    TR,    BL,   BR]

// GL_TRIANGLE_STRIP renders:
// Triangle 1: TL → TR → BL
// Triangle 2: TR → BL → BR
```

### Coordinate Systems

```
WebGL Clip Space     Canvas/Screen Space
    (-1,1)────(1,1)       (0,0)────(W,0)
      │        │            │        │
      │        │            │        │
    (-1,-1)─(1,-1)         (0,H)─(W,H)

// Fragment Shader converts:
uv = gl_FragCoord.xy / canvasSize
uv.y = 1.0 - uv.y (flip Y axis)
```

### Texture Sampling

```glsl
// Video frame upload
gl_TEXTURE_2D ← Video Element
↓
gl.texImage2D(TEXTURE_2D, 0, RGB, RGB, UNSIGNED_BYTE, video)

// In Fragment Shader
vec4 color = texture(u_image, uv);
// Returns: normalized RGBA [0.0, 1.0]
```

---

## 📊 Performance Monitoring

### FPS Calculation

```javascript
frameCount = 0
lastTime = Date.now()

renderLoop:
  frameCount++
  elapsed = Date.now() - lastTime
  
  if (elapsed >= 1000):
    fps = Math.round((frameCount * 1000) / elapsed)
    frameCount = 0
    lastTime = Date.now()
```

### Memory Tracking

```javascript
if (performance.memory available):
  usedMemory = performance.memory.usedJSHeapSize / 1048576 // MB
  // Updated every 1000ms
```

### Performance Tiers

```
Good:  fps >= 30  (✓ target achieved)
Fair:  fps >= 20  (⚠ acceptable)
Poor:  fps <  20  (✗ below target)
```

---

## 🔧 Configuration & Setup

### Vite Configuration (`vite.config.js`)

```javascript
// Development
- Port: 3000
- Auto-open browser
- Fast refresh enabled

// Production Build
- Target: ES2020
- Minification: Terser
- Code splitting enabled
- Console logs removed
```

### Browser Capabilities

**Required**:
- WebGL 2.0 (Chrome 56+, Firefox 51+, Safari 15+)
- getUserMedia API (HTTPS required)
- ES2020 JavaScript features

**Optional**:
- performance.memory (Chrome-only)
- High DPI display (automatic scaling)

---

## 🚀 Performance Optimization Strategies

### 1. GPU-Side Optimization
- Single-pass rendering (no post-processing)
- Efficient texture sampling (linear filtering)
- Minimal state changes
- No FBO/framebuffer ping-ponging

### 2. CPU-Side Optimization
- RequestAnimationFrame throttling (60 Hz max)
- Lazy shader compilation (only on mode change)
- Efficient state updates (React batching)
- Minimal JavaScript per frame

### 3. Memory Optimization
- Texture reuse (single video texture)
- Buffer pooling for vertex data
- No texture atlasing (single source)
- Automatic garbage collection

### 4. Bandwidth Optimization
- Single HD video stream
- No external asset loading
- Inline shader compilation
- Minimal network traffic

---

## 🐛 Debugging Tips

### Console Logging

```javascript
// Enable detailed WebGL logging
const gl = canvas.getContext('webgl2-debug', {...});

// Check shader compilation errors
gl.getShaderInfoLog(shader)
gl.getProgramInfoLog(program)

// Verify texture upload
gl.getTexImage(TEXTURE_2D, 0, RGB, UNSIGNED_BYTE, pixels)
```

### Performance Profiling

```javascript
// Chrome DevTools
1. Open DevTools (F12)
2. Performance tab
3. Record rendering loop
4. Analyze FPS, GPU time, memory
```

### Visual Debugging

```glsl
// Debug fragment shader output
outColor = vec4(vec3(gl_FragCoord.xy / 1280.0), 1.0);
// Show position-based gradient
```

---

## 📝 Common Issues & Solutions

### Issue 1: Low FPS on Mobile
**Causes**: Limited GPU, high resolution, CSS filters
**Solutions**:
- Reduce video resolution (640x480)
- Disable background apps
- Use landscape orientation
- Check device temperature

### Issue 2: Camera Not Recognized
**Causes**: Missing permissions, HTTPS required, browser issue
**Solutions**:
- Check camera permissions in settings
- Use HTTPS (localhost OK for dev)
- Try different browser
- Check security policy

### Issue 3: Shader Compilation Errors
**Causes**: Invalid GLSL syntax, unsupported features
**Solutions**:
- Check browser console for error messages
- Verify WebGL 2.0 support
- Check GLSL ES 3.0 compatibility
- Review shader source code

### Issue 4: Visual Artifacts
**Causes**: Texture coordinate issues, color precision
**Solutions**:
- Verify video dimensions match
- Check UV coordinate clamping
- Adjust color parameters
- Clear WebGL state

---

## 🎓 Educational Value

### WebGL Concepts Demonstrated
- Shader compilation and linking
- Texture sampling and filtering
- Uniform variables
- Vertex and fragment processing
- GPU acceleration benefits

### React Patterns
- Component composition
- State management
- Effect hooks
- Callback optimization
- Ref management

### Performance Engineering
- FPS monitoring
- GPU utilization
- Memory tracking
- Real-time constraints

---

## 🔮 Future Enhancement Ideas

1. **Advanced Filters**
   - Edge detection (Sobel)
   - Bloom effects
   - Temporal filters
   - Depth-based processing

2. **More Animal Modes**
   - Mantis shrimp (12+ color channels)
   - Snake (infrared sensitivity)
   - Squid (polarization vision)
   - Hawk (extreme acuity)

3. **Recording & Export**
   - Screen recording
   - PNG snapshots
   - Video export (WebCodecs)
   - Replay functionality

4. **Advanced Analysis**
   - Color histogram
   - Motion detection
   - Edge detection overlay
   - Thermal visualization

5. **Mobile Optimization**
   - Touch controls
   - Accelerometer input
   - Battery optimization
   - Offline support

---

## 📚 References

- [Khronos WebGL 2.0 Specification](https://www.khronos.org/webgl2/spec/)
- [GLSL ES 3.0 Reference](https://www.khronos.org/registry/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)
- [MDN WebGL Guide](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [Animal Vision Research](https://scholar.google.com/scholar?q=animal+color+vision)

---

**Document Version**: 1.0  
**Last Updated**: August 30, 2026  
**Compatibility**: WebGL 2.0+, React 18+
