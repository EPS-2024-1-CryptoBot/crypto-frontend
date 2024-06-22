import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const tifs = ['GTC', 'GTD', 'IOC'];

interface SelectTIFProps {
  onSelect: (tif: string) => void;
  disabled?: boolean;
}

const SelectTIF: React.FC<SelectTIFProps> = ({ onSelect, disabled }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Escolha...');

  const toggleActive = () => {
    if (!disabled) {
      setIsActive(!isActive);
    }
  };

  const handleSelect = (tif: string) => {
    setSelected(tif);
    onSelect(tif); // Notify parent component of the selected tif
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
            {tifs.length ? (
              tifs.map((tif) => (
                <option
                  key={tif}
                  className={`cursor-pointer p-1 rounded ${
                    tif === selected ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleSelect(tif)}
                >
                  {tif}
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

export default SelectTIF;
