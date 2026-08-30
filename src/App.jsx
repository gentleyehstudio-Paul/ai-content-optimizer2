import React, { useState, useCallback, useRef, useEffect } from 'react';
import VideoCapture from './components/VideoCapture';
import PerformanceMonitor from './components/PerformanceMonitor';
import ControlPanel from './components/ControlPanel';
import './styles/App.css';

export default function App() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('dog');
  const [isActive, setIsActive] = useState(false);
  const [fps, setFps] = useState(0);
  const [parameters, setParameters] = useState({
    dog: { saturation: 0.3, brightness: 1.2, colorShift: 0.8 },
    cat: { saturation: 0.6, brightness: 1.5, colorShift: 0.6 },
    bird: { saturation: 1.0, brightness: 1.3, uvSensitivity: 1.2 },
    bee: { saturation: 0.8, brightness: 1.1, uvSensitivity: 1.5 },
  });
  const [error, setError] = useState(null);

  const handleModeChange = useCallback((newMode) => {
    setMode(newMode);
  }, []);

  const handleParameterChange = useCallback((param, value) => {
    setParameters(prev => ({
      ...prev,
      [mode]: { ...prev[mode], [param]: value }
    }));
  }, [mode]);

  const handleFpsUpdate = useCallback((newFps) => {
    setFps(newFps);
  }, []);

  const handleError = useCallback((errorMsg) => {
    setError(errorMsg);
    console.error('App Error:', errorMsg);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🐾 Animal Vision WebGL Simulator</h1>
        <p>Experience the world through different animal eyes</p>
      </header>

      <main className="app-main">
        <div className="canvas-wrapper">
          <VideoCapture
            ref={canvasRef}
            mode={mode}
            isActive={isActive}
            parameters={parameters[mode]}
            onFpsUpdate={handleFpsUpdate}
            onError={handleError}
          />
          {error && (
            <div className="error-banner">
              <span>{error}</span>
              <button onClick={() => setError(null)}>✕</button>
            </div>
          )}
        </div>

        <aside className="controls-sidebar">
          <PerformanceMonitor fps={fps} mode={mode} />

          <ControlPanel
            mode={mode}
            onModeChange={handleModeChange}
            parameters={parameters[mode]}
            onParameterChange={handleParameterChange}
            isActive={isActive}
            onToggle={() => setIsActive(!isActive)}
          />
        </aside>
      </main>

      <footer className="app-footer">
        <p>WebGL 2.0 • GPU-Accelerated • Real-time Filtering</p>
      </footer>
    </div>
  );
}
