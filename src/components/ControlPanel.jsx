import React from 'react';
import { ANIMAL_MODES, SHADER_PARAMETERS } from '../shaders/shaderRegistry';
import '../styles/ControlPanel.css';

export default function ControlPanel({
  mode,
  onModeChange,
  parameters,
  onParameterChange,
  isActive,
  onToggle
}) {
  const currentParams = SHADER_PARAMETERS[mode] || [];

  return (
    <div className="control-panel">
      <div className="panel-section">
        <h3>Animal Vision Mode</h3>
        <div className="mode-buttons">
          {ANIMAL_MODES.map(animal => (
            <button
              key={animal.id}
              className={`mode-button ${mode === animal.id ? 'active' : ''}`}
              onClick={() => onModeChange(animal.id)}
              title={animal.description}
            >
              {animal.name}
            </button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <h3>Camera Control</h3>
        <button
          className={`toggle-button ${isActive ? 'active' : ''}`}
          onClick={onToggle}
        >
          {isActive ? '⏸ Stop Camera' : '▶ Start Camera'}
        </button>
      </div>

      <div className="panel-section">
        <h3>Vision Parameters</h3>
        <div className="parameters">
          {currentParams.map(param => (
            <div key={param.name} className="parameter-control">
              <label htmlFor={param.name} className="parameter-label">
                {param.label}
              </label>
              <div className="parameter-input-group">
                <input
                  id={param.name}
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={parameters[param.name]}
                  onChange={(e) =>
                    onParameterChange(param.name, parseFloat(e.target.value))
                  }
                  className="parameter-slider"
                />
                <span className="parameter-value">
                  {parameters[param.name].toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-section info-section">
        <h3>ℹ️ About {ANIMAL_MODES.find(m => m.id === mode)?.name}</h3>
        <p className="mode-description">
          {getModeDescription(mode)}
        </p>
      </div>
    </div>
  );
}

function getModeDescription(mode) {
  const descriptions = {
    dog: 'Dogs see in dichromatic vision (blue-yellow). They have poor red perception but excellent motion detection and night vision. This simulator reduces color saturation and shifts reds toward yellow.',
    cat: 'Cats have excellent night vision with 6x better light perception than humans. They have a narrower color range but superior motion detection. This view enhances blues and greens while dimming reds.',
    bird: 'Birds are tetrachromatic, seeing UV light invisible to humans. They have the sharpest vision of all animals and can see fine details at great distances.',
    bee: 'Bees see in ultraviolet, blue, and green - not red. They perceive polarized light and have compound eyes. This creates a pixelated, UV-enhanced view of the world.',
  };

  return descriptions[mode] || '';
}
