import React, { useState } from 'react';
import SelectContract from './SelectContract';
import SelectStrategy from './SelectStrategy';
import SelectTimeframe from './SelectTimeframe';

interface Strategy {
  strategyType: string;
  contract: string;
  timeframe: string;
  balance: string;
  tp: string;
  sl: string;
  isActive: boolean;
}

const Strategies: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);

  const addStrategy = () => {
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
    const sanitizedValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(sanitizedValue);
    const boundedValue = numericValue > 100 ? '100' : numericValue < 0 ? '0' : sanitizedValue;

    const updatedStrategies = strategies.map((strategy, i) =>
      i === index ? { ...strategy, [field]: boundedValue } : strategy
    );
    setStrategies(updatedStrategies);
  };

  const renderStrategies = () => {
    return strategies.map((strategy, index) => (
      <div key={index} className="flex items-center space-x-2 mb-2">
        <SelectStrategy/>

        <SelectContract/>

        <SelectTimeframe/>

        <input
          type="text"
          className="p-2 border border-gray-300 rounded text-black w-16"
          placeholder="Balance %"
          value={strategy.balance}
          onChange={(e) =>
            handleInputChange(index, 'balance', e.target.value)
          }
        />

        <input
          type="text"
          className="p-2 border border-gray-300 rounded text-black w-16"
          placeholder="TP %"
          value={strategy.tp}
          onChange={(e) =>
            handleInputChange(index, 'tp', e.target.value)
          }
        />

        <input
          type="text"
          className="p-2 border border-gray-300 rounded text-black w-16"
          placeholder="SL %"
          value={strategy.sl}
          onChange={(e) =>
            handleInputChange(index, 'sl', e.target.value)
          }
        />

        <button
          className={`p-1 border rounded ${strategy.isActive ? 'bg-green-500' : 'bg-red-500'}`}
          onClick={() => toggleActive(index)}
        >
          {strategy.isActive ? 'ON' : 'OFF'}
        </button>

        <button className="p-1 border bg-gray-300 rounded" onClick={() => removeStrategy(index)}>
          X
        </button>
      </div>
    ));
  };

  return (
    <div className="text-center">
      <button className="my-4 p-2 bg-secondary text-white rounded" onClick={addStrategy}>
        Add Strategy
      </button>
      <div className="space-y-2">{renderStrategies()}</div>
    </div>
  );
};

export default Strategies;
