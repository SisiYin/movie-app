import React, { useState,useEffect } from 'react';
import './ToggleSwitch.css'; 

const ToggleSwitch = ({ initialState, onToggle }) => {
  const [isOn, setIsOn] = useState(initialState);

  useEffect(() => {
    setIsOn(initialState);
  }, [initialState]);

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
