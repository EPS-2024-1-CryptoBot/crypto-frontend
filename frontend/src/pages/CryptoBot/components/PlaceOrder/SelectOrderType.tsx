import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const orderTypes = ['Market', 'Limit', 'Stop', 'Take Profit'];

interface SelectOrderTypeProps {
  onSelect: (orderType: string) => void;
  disabled?: boolean;
}

const SelectOrderType: React.FC<SelectOrderTypeProps> = ({ onSelect, disabled }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Escolha...');

  const toggleActive = () => {
    if (!disabled) {
      setIsActive(!isActive);
    }
  };

  const handleSelect = (orderType: string) => {
    setSelected(orderType);
    onSelect(orderType); // Notify parent component of the selected orderType
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
            {orderTypes.length ? (
              orderTypes.map((orderType) => (
                <option
                  key={orderType}
                  className={`cursor-pointer p-1 rounded ${
                    orderType === selected ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleSelect(orderType)}
                >
                  {orderType}
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

export default SelectOrderType;
