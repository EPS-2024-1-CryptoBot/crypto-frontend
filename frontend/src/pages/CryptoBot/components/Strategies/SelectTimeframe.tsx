import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h'];

interface SelectTimeframeProps {
  disabled?: boolean;
}

const SelectTimeframe: React.FC<SelectTimeframeProps> = ({ disabled }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Timeframe');

  const toggleActive = () => {
    if (!disabled) {
      setIsActive(!isActive);
    }
  };

  const handleSelect = (timeframe: string) => {
    setSelected(timeframe);
    setIsActive(false);
  };

  return (
    <div className="relative mt-2">
      <button
        className={`border border-gray-400 p-2 w-32 rounded cursor-pointer flex justify-between items-center ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={toggleActive}
      >
        <span>{selected}</span>
        {isActive ? (
          <FaChevronUp className="w-5 h-5" />
        ) : (
          <FaChevronDown className="w-5 h-5" />
        )}
      </button>
      {isActive && !disabled && (
        <div className="border border-gray-400 rounded mt-1 w-52 absolute z-10 bg-white p-2">
          <ul className="max-h-64 overflow-auto text-sm text-left text-black">
            {timeframes.length ? (
              timeframes.map((timeframe) => (
                <option
                  key={timeframe}
                  className={`cursor-pointer p-1 rounded ${
                    timeframe === selected ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleSelect(timeframe)}
                >
                  {timeframe}
                </option>
              ))
            ) : (
              <li className="p-1">Nenhum item encontrado</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectTimeframe;
