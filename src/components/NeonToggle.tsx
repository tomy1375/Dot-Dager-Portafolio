import React, { useState, useEffect } from 'react';

interface NeonToggleProps {
  onToggle: (isOn: boolean) => void;
}

const NeonToggle: React.FC<NeonToggleProps> = ({ onToggle }) => {
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    onToggle(isOn);
  }, [isOn, onToggle]);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-full transition-all duration-300 ${
        isOn ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700'
      }`}
    >
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
};

export default NeonToggle;

