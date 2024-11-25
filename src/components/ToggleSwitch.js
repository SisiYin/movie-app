import React, { useState } from 'react';
import './ToggleSwitch.css'; 

const ToggleSwitch = ({ initialState = false, onToggle }) => {
  const [isOn, setIsOn] = useState(initialState);

  // switch states
  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);

    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div
      className={`toggle-switch ${isOn ? 'on' : 'off'}`}
      onClick={handleToggle}
    >
      <div className="slider" />
    </div>
  );
};

export default ToggleSwitch;
