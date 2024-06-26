import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const sides = ['Buy', 'Sell'];

interface SelectSideProps {
  onSelect: (side: string) => void;
  disabled?: boolean;
}

const SelectSide: React.FC<SelectSideProps> = ({ onSelect, disabled }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Escolha...');

  const toggleActive = () => {
    if (!disabled) {
      setIsActive(!isActive);
    }
  };

  const handleSelect = (side: string) => {
    setSelected(side);
    onSelect(side);
    setIsActive(false);
  };

  return (
    <div>
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
        <div className="border border-gray-400 rounded mt-1 w-32 absolute bg-white p-2">
          <ul className="max-h-64 overflow-auto text-sm text-left text-black">
            {sides.length ? (
              sides.map((side) => (
                <option
                  key={side}
                  className={`cursor-pointer p-1 rounded ${
                    side === selected ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleSelect(side)}
                >
                  {side}
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

export default SelectSide;
