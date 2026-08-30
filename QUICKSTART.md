# 🚀 Quick Start Guide - Animal Vision WebGL Simulator

## ⚡ 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# → http://localhost:3000
```

## 📋 Project Structure

```
src/
├── App.jsx                    # Main app (state management)
├── index.jsx                  # React entry point
├── index.html                 # HTML template
├── components/
│   ├── VideoCapture.jsx       # WebGL renderer
│   ├── ControlPanel.jsx       # UI controls
│   └── PerformanceMonitor.jsx # FPS & stats
├── utils/
│   └── webglUtils.js          # WebGL shader tools
├── shaders/
│   └── shaderRegistry.js      # Animal vision shaders
└── styles/
    ├── App.css
    ├── VideoCapture.css
    ├── ControlPanel.css
    └── PerformanceMonitor.css
```

## 🎯 Key Files & Their Purpose

| File | Purpose | Key Export |
|------|---------|-----------|
| `App.jsx` | State manager | `default` (React component) |
| `VideoCapture.jsx` | WebGL rendering | Forwarded ref component |
| `webglUtils.js` | GPU tools | `initWebGL`, `createShaderProgram`, `renderFrame` |
| `shaderRegistry.js` | GLSL shaders | `getShaderSource(mode)` |
| `ControlPanel.jsx` | UI controls | Mode toggles + sliders |
| `PerformanceMonitor.jsx` | Stats display | FPS counter + memory |

## 🎮 Using the Simulator

### 1. Start Camera
```
Click "▶ Start Camera" button
→ Grant camera permissions
→ Video feed appears
```

### 2. Switch Animal Modes
```
Click any animal button:
🐕 Dog Vision      - Dichromatic (blue-yellow)
🐱 Cat Vision      - Enhanced night vision
🐦 Bird Vision     - Tetrachromatic UV
🐝 Bee Vision      - Compound eyes + UV
```

### 3. Adjust Parameters
```
Move sliders to tweak:
- Saturation (color intensity)
- Brightness (luminance)
- Color/UV Sensitivity (species-specific)
```

### 4. Monitor Performance
```
Watch FPS counter in sidebar:
✓ 30+ FPS = Good
⚠ 20-30 FPS = Fair
✗ <20 FPS = Poor
```

## 🔧 Development Commands

```bash
# Start dev server (auto-reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check (TypeScript)
npm run type-check

# Lint code
npm run lint
```

## 🌐 Browser Support

| Browser | Min Version | Status |
|---------|-------------|--------|
| Chrome | 56+ | ✅ Full support |
| Firefox | 51+ | ✅ Full support |
| Safari | 15+ | ✅ Full support |
| Edge | 79+ | ✅ Full support |
| Mobile Chrome | 56+ | ✅ Optimized |
| Safari iOS | 15+ | ✅ Optimized |

## ⚠️ Requirements

- **HTTPS** required (for camera access)
- **WebGL 2.0** support
- **Modern browser** (2016+)
- **Camera device** (webcam)

## 🐛 Troubleshooting

### Camera Not Working?
```
1. Check permissions (browser settings)
2. Ensure HTTPS connection
3. Try different browser
4. Restart browser/device
```

### Low FPS?
```
1. Reduce video resolution
2. Close other apps
3. Check device temperature
4. Rotate to landscape (mobile)
```

### Shader Error?
```
1. Check browser console (F12)
2. Verify WebGL 2.0 support
3. Try reloading page
4. Check GLSL syntax
```

## 📊 Performance Expectations

| Device | Resolution | Expected FPS |
|--------|-----------|--------------|
| Desktop (modern GPU) | 1280×720 | 60 |
| Laptop | 1024×768 | 40-50 |
| Tablet (iPad) | 1024×768 | 35-40 |
| Mobile (flagship) | 640×480 | 30+ |

## 🎨 Shader Modes Explained

### 🐕 Dog Vision
- **Perception**: Dichromatic (red-green colorblind)
- **Strength**: Motion detection, night vision
- **Effect**: Blue-yellow dominant, desaturated reds

### 🐱 Cat Vision
- **Perception**: Enhanced night vision (6x human)
- **Strength**: Motion sensitivity, low-light vision
- **Effect**: Boosted greens/blues, high contrast

### 🐦 Bird Vision
- **Perception**: Tetrachromatic (sees UV)
- **Strength**: Color perception, high acuity
- **Effect**: Enhanced colors, UV channel visible

### 🐝 Bee Vision
- **Perception**: Compound eyes, UV focus
- **Strength**: Fast motion tracking, polarization
- **Effect**: Pixelated view, UV enhancement

## 🚀 Next Steps

1. **Explore Shaders**: Open `src/shaders/shaderRegistry.js`
2. **Modify Parameters**: Edit default values in `App.jsx`
3. **Create New Mode**: Add shader to `shaderRegistry.js`
4. **Optimize Performance**: Review `webglUtils.js`
5. **Read Full Docs**: See `ANIMAL_VISION_README.md`

## 📖 Detailed Documentation

- **Full Guide**: `ANIMAL_VISION_README.md` (features, API, troubleshooting)
- **Implementation**: `IMPLEMENTATION_GUIDE.md` (technical deep dive)
- **WebGL Spec**: https://www.khronos.org/webgl/
- **GLSL Reference**: https://www.khronos.org/registry/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf

## 💡 Pro Tips

1. **High Contrast Scenes**: Bring out best results for cat vision
2. **Bright Sunlight**: Test bird vision (UV sensitivity)
3. **Close-up Objects**: See bee compound eye pixelation
4. **Moving Around**: Feel dog's motion sensitivity
5. **Parameter Tweaking**: Find sweet spots for each mode

## 🎓 Learning Path

```
Beginner
  ↓
Explore UI & animal modes
  ↓
Intermediate
  ↓
Read ANIMAL_VISION_README.md
Check src/components structure
  ↓
Advanced
  ↓
Study IMPLEMENTATION_GUIDE.md
Review shader algorithms
Optimize performance
  ↓
Expert
  ↓
Modify shaders
Create new animal modes
Implement post-processing
```

## 🤝 Contributing

To modify or extend:

1. **Add Animal Mode**:
   - Define fragment shader in `shaderRegistry.js`
   - Add to `ANIMAL_MODES` array
   - Define parameters in `SHADER_PARAMETERS`
   - Export via `getShaderSource()`

2. **Adjust Parameters**:
   - Edit initial values in `App.jsx`
   - Change slider ranges in `SHADER_PARAMETERS`
   - Modify shader math in fragment shaders

3. **Optimize Performance**:
   - Profile in Chrome DevTools
   - Check `renderLoop` in `VideoCapture.jsx`
   - Review GPU/CPU bottlenecks

## 📞 Support

| Topic | Resource |
|-------|----------|
| WebGL Issues | MDN WebGL API docs |
| React Questions | React 18 documentation |
| Performance | Chrome DevTools Performance tab |
| Biology | Wikipedia animal vision articles |

---

**Ready to experience the world through animal eyes? Let's go! 🐾**

Start with: `npm install && npm run dev`
