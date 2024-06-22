import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const order_types = ['MARKET', 'LIMIT', 'STOP', 'TAKE_PROFIT'];

interface SelectOrderTypeProps {
  disabled?: boolean;
}

const SelectTimeframe: React.FC<SelectOrderTypeProps> = ({ disabled }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Escolha...');

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
    <div className="relative">
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
        <div className="border border-gray-400 rounded mt-1 w-52 absolute bg-white p-2">
          <ul className="max-h-64 overflow-auto text-sm text-left text-black">
            {order_types.length ? (
              order_types.map((timeframe) => (
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
