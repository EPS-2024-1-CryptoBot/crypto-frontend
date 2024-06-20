import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const strategies = ['Technical', 'Breakout'];

const SelectStrategy: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Strategy');

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const handleSelect = (strategy: string) => {
    setSelected(strategy);
    setIsActive(false);
  };

  return (
    <div className="relative mt-5">
      <div
        className="border border-gray-400 p-2 w-32 rounded cursor-pointer flex justify-between items-center"
        onClick={toggleActive}
      >
        <span>{selected}</span>
        {isActive ? (
          <FaChevronUp className="w-5 h-5" />
        ) : (
          <FaChevronDown className="w-5 h-5" />
        )}
      </div>
      {isActive && (
        <div className="border border-gray-400 rounded mt-1 w-52 absolute z-10 bg-white p-2">
          <ul className="max-h-64 overflow-auto text-sm text-left text-black">
            {strategies.length ? (
              strategies.map((strategy) => (
                <li
                  key={strategy}
                  className={`cursor-pointer p-1 rounded ${
                    strategy === selected ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleSelect(strategy)}
                >
                  {strategy}
                </li>
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

export default SelectStrategy;
