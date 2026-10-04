import React, { useState, useEffect, useRef } from 'react';
import '../styles/PerformanceMonitor.css';

export default function PerformanceMonitor({ fps, mode }) {
  const [memory, setMemory] = useState(0);
  const [avgFps, setAvgFps] = useState(fps);
  const fpsHistoryRef = useRef([]);

  useEffect(() => {
    // Track FPS history for average
    fpsHistoryRef.current.push(fps);
    if (fpsHistoryRef.current.length > 60) {
      fpsHistoryRef.current.shift();
    }

    const avg = Math.round(
      fpsHistoryRef.current.reduce((a, b) => a + b, 0) /
        fpsHistoryRef.current.length
    );
    setAvgFps(avg);
  }, [fps]);

  useEffect(() => {
    // Update memory usage (if available)
    const updateMemory = () => {
      if (performance.memory) {
        const usedMemory = performance.memory.usedJSHeapSize / 1048576; // Convert to MB
        setMemory(usedMemory.toFixed(1));
      }
    };

    const interval = setInterval(updateMemory, 1000);
    return () => clearInterval(interval);
  }, []);

  const fpsStatus = fps >= 30 ? 'good' : fps >= 20 ? 'fair' : 'poor';

  return (
    <div className="performance-monitor">
      <div className="monitor-header">
        <h3>Performance</h3>
        <span className={`status-indicator ${fpsStatus}`} title={fpsStatus} />
      </div>

      <div className="monitor-stats">
        <div className="stat-row">
          <span className="stat-label">Current FPS</span>
          <span className="stat-value fps-value">{fps}</span>
        </div>

        <div className="stat-row">
          <span className="stat-label">Average FPS</span>
          <span className="stat-value">{avgFps}</span>
        </div>

        <div className="stat-row">
          <span className="stat-label">Frame Time</span>
          <span className="stat-value">{fps > 0 ? (1000 / fps).toFixed(1) : '—'}ms</span>
        </div>

        {memory > 0 && (
          <div className="stat-row">
            <span className="stat-label">Memory</span>
            <span className="stat-value">{memory}MB</span>
          </div>
        )}

        <div className="stat-row">
          <span className="stat-label">Shader Mode</span>
          <span className="stat-value mode-badge">{mode.toUpperCase()}</span>
        </div>
      </div>

      <div className="target-info">
        <p>🎯 Target: 30+ FPS (60 FPS optimal)</p>
        <div className="performance-bar">
          <div
            className="performance-fill"
            style={{ width: `${Math.min((fps / 60) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="compatibility-info">
        <p className="text-small">✓ WebGL 2.0</p>
        <p className="text-small">✓ getUserMedia API</p>
        <p className="text-small">✓ GPU Acceleration</p>
      </div>
    </div>
  );
}
