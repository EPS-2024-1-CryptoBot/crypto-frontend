import React, { useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import { formatInputValue } from '../../../../utils/utils';
import SelectContract from './SelectContract';
import SelectOrderType from './SelectOrderType';
import SelectSide from './SelectSide';

interface Strategy {
  strategyType: string;
  contract: string;
  timeframe: string;
  balance: string;
  tp: string;
  sl: string;
  isActive: boolean;
  rsiPeriods?: string;
  macdFastLength?: string;
  macdSlowLength?: string;
  macdSignalLength?: string;
  minimumVolume?: string;
}

interface Order {
  symbol: string;
  side: string;
  orderType: string;
  price?: string;
  quantity?: string;
  tif?: string;
  stopPrice?: string;
  isActive: boolean;
}

const PlaceOrder: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const addStrategy = () => {
    if (strategies.length < 10) {
      setStrategies([
        ...strategies,
        {
          strategyType: '',
          contract: '',
          timeframe: '',
          balance: '',
          tp: '',
          sl: '',
          isActive: false,
        },
      ]);
    } else {
      setShowLimitModal(true);
    }
  };

  const removeStrategy = (index: number) => {
    setStrategies(strategies.filter((_, i) => i !== index));
  };

  const toggleActive = (index: number) => {
    setStrategies(
      strategies.map((strategy, i) =>
        i === index ? { ...strategy, isActive: !strategy.isActive } : strategy
      )
    );
  };

  const handleInputChange = (index: number, field: keyof Strategy, value: string) => {
    const boundedValue = formatInputValue(value);
    const updatedStrategies = strategies.map((strategy, i) =>
      i === index ? { ...strategy, [field]: boundedValue } : strategy
    );
    setStrategies(updatedStrategies);
  };

  const handleStrategySelect = (index: number, strategyType: string) => {
    setStrategies(
      strategies.map((strategy, i) =>
        i === index ? { ...strategy, strategyType } : strategy
      )
    );
  };

  const renderAdditionalInputs = (strategy: Strategy, index: number) => {
    if (strategy.strategyType === 'Limit') {
      return (
        <div className="flex space-x-2">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="Time in Force"
            value={strategy.rsiPeriods ?? ''}
            onChange={(e) => handleInputChange(index, 'rsiPeriods', e.target.value)}
            disabled={strategy.isActive}
            data-tooltip-id='tif-tooltip'
            data-tooltip-content="Time in force. Ex.: GTC"
            data-tooltip-place='top'
          />
          <Tooltip id="tif-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="Quantidade"
            value={strategy.minimumVolume ?? ''}
            onChange={(e) => handleInputChange(index, 'minimumVolume', e.target.value)}
            disabled={strategy.isActive}
            data-tooltip-id='qt-tooltip'
            data-tooltip-content="Quantidade. Ex.: 0.02"
            data-tooltip-place='top'
          />
          <Tooltip id="qt-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }}/>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="Preço"
            value={strategy.macdSlowLength ?? ''}
            onChange={(e) => handleInputChange(index, 'macdSlowLength', e.target.value)}
            disabled={strategy.isActive}
            data-tooltip-id='price-tooltip'
            data-tooltip-content="Preço. Ex.: 1000(USD)"
            data-tooltip-place='top'
          />
          <Tooltip id="price-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
        </div>
      );
    }

    if (strategy.strategyType === 'Market') {
      return (
        <>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="Quantidade"
            value={strategy.minimumVolume ?? ''}
            onChange={(e) => handleInputChange(index, 'minimumVolume', e.target.value)}
            disabled={strategy.isActive}
            data-tooltip-id='qt-tooltip'
            data-tooltip-content="Quantidade. Ex.: 0.02"
            data-tooltip-place='top'
          />
          <Tooltip id="qt-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }}/>
        </>
      );
    }

    return null;
  };

  const renderStrategies = () => {
    return strategies.map((strategy, index) => (
      <tr key={index}>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          <SelectContract disabled={strategy.isActive} />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          <SelectSide
            onSelect={(strategyType) => handleStrategySelect(index, strategyType)}
            disabled={strategy.isActive}
          />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          <SelectOrderType 
          onSelect={(strategyType) => handleStrategySelect(index, strategyType)}
          disabled={strategy.isActive} />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          {renderAdditionalInputs(strategy, index)}
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`p-2 border rounded ${strategy.isActive ? 'bg-green-500' : 'bg-red-500'}`}
            onClick={() => toggleActive(index)}
          >
            {strategy.isActive ? 'ON' : 'OFF'}
          </button>
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
          <button 
            className={`p-3 bg-secondary border rounded ${strategy.isActive ? 'cursor-not-allowed opacity-50' : ''}`} 
            onClick={() => !strategy.isActive && removeStrategy(index)} 
            disabled={strategy.isActive}
          >
            <MdClose />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="text-center w-full h-full overflow-auto">
      {showLimitModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg text-secondary font-bold flex justify-center items-center">
              Atualize para o <span className="text-yellow-500 ml-1">Premium</span> <FaCrown className="text-yellow-500 ml-1" />
            </p>
            <p className="text-sm text-secondary mt-2">Atualize para um plano premium para adicionar mais de 10 ofertas.</p>
            
            <button
              className="mt-6 px-4 py-2 bg-secondary text-white rounded"
              onClick={() => setShowLimitModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      <button className="my-8 p-2 bg-secondary text-white rounded" onClick={addStrategy}>
        Nova Oferta
      </button>
      <div className="max-h-full">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md text-center items-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Cripto</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Lado</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Tipo de Oferta</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">Parâmetros</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900"></th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900"></th>
            </tr>
          </thead>
          <tbody>
            {renderStrategies()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaceOrder;
