import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const cryptocurrencies = [
  'Bitcoin (Binance)',
  'Ethereum',
  'Ripple',
  'Litecoin',
  'Cardano',
  'Polkadot',
  'Chainlink',
  'Stellar',
  'Dogecoin',
  'Solana'
];

interface SelectContractProps {
  disabled?: boolean;
}

const SelectContract: React.FC<SelectContractProps> = ({ disabled }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Contract');
  const [filter, setFilter] = useState('');

  const toggleActive = () => {
    if (!disabled) {
      setIsActive(!isActive);
    }
  };

  const handleSelect = (crypto: string) => {
    setSelected(crypto);
    setFilter('');
    setIsActive(false);
  };

  const filteredCryptos = cryptocurrencies.filter((crypto) =>
    crypto.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="relative mt-2">
      <button
        className={`border border-gray-400 p-2 w-52 rounded cursor-pointer flex justify-between items-center ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
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
          <input
            type="text"
            className="p-1 w-full mb-2 outline-none text-sm placeholder-gray-600 text-gray-600"
            placeholder="Pesquisar..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            autoFocus
          />
          <ul className="max-h-64 overflow-auto text-sm text-left text-black">
            {filteredCryptos.length ? (
              filteredCryptos.map((crypto) => (
                <option
                  key={crypto}
                  className={`cursor-pointer p-1 rounded ${
                    crypto === selected ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleSelect(crypto)}
                >
                  {crypto}
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

export default SelectContract;
