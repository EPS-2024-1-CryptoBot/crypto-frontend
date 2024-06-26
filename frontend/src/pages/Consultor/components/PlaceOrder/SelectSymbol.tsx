import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { api } from '../../../../config/api';

interface SelectSymbolProps {
  disabled?: boolean;
  onSelect: (symbol: string) => void;
}

const SelectSymbol: React.FC<SelectSymbolProps> = ({ disabled, onSelect }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Escolha a cripto...');
  const [filter, setFilter] = useState('');
  const [cryptocurrencies, setCryptocurrencies] = useState<{ symbol: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getContracts = async () => {
      setLoading(true);
      try {
        const res = await api.get('/consultant/contract_list');
        const contractData = res.data;
        const cryptoList = Object.keys(contractData).map(key => ({
          symbol: contractData[key].symbol,
        }));
        setCryptocurrencies(cryptoList);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getContracts();
  }, []);

  const toggleActive = () => {
    if (!disabled) {
      setIsActive(!isActive);
    }
  };

  const handleSelect = (crypto: string) => {
    setSelected(crypto);
    setFilter('');
    setIsActive(false);
    onSelect(crypto);
  };

  const filteredCryptos = cryptocurrencies.filter((crypto) =>
    crypto.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <button
        className={`border border-gray-400 p-2 w-44 rounded cursor-pointer flex justify-between items-center ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
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
        <div className="border border-gray-400 rounded mt-1 w-44 absolute bg-white p-2">
          {loading ? (
            <div className="text-center text-sm text-black p-2">Carregando criptos...</div>
          ) : (
            <>
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
                      key={crypto.symbol}
                      className={`cursor-pointer p-1 rounded ${
                        crypto.symbol === selected ? 'bg-gray-200' : ''
                      }`}
                      onClick={() => handleSelect(crypto.symbol)}
                    >
                      {crypto.symbol}
                    </option>
                  ))
                ) : (
                  <li className="p-1">Nenhum item encontrado</li>
                )}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectSymbol;
