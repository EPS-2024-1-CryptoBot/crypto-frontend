import React, { useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import { formatInputValue } from '../../../../utils/utils';
import SelectContract from './SelectContract';
import SelectTimeframe from './SelectOrderType';
import SelectSide from './SelectSide';


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
  const [order, setOrder] = useState<Order[]>([]);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const addOrder = () => {
    if (order.length < 10) {
      setOrder([
        ...order,
        {
          symbol: '',
          side: '',
          quantity: '',
          orderType: '',
          price: '',
          tif: '',
          isActive: false,
        },
      ]);
    } else {
      setShowLimitModal(true);
    }
  };

  const removeStrategy = (index: number) => {
    setOrder(order.filter((_, i) => i !== index));
  };

  const toggleActive = (index: number) => {
    setOrder(
      order.map((order, i) =>
        i === index ? { ...order, isActive: !order.isActive } : order
      )
    );
  };

  const handleInputChange = (index: number, field: keyof Order, value: string) => {
    const boundedValue = formatInputValue(value);
    const updatedStrategies = order.map((order, i) =>
      i === index ? { ...order, [field]: boundedValue } : order
    );
    setOrder(updatedStrategies);
  };

  const handleStrategySelect = (index: number, orderType: string) => {
    setOrder(
      order.map((order, i) =>
        i === index ? { ...order, orderType } : order
      )
    );
  };

  const renderAdditionalInputs = (order: Order, index: number) => {
    if (order.orderType === 'LIMIT') {
      return (
        <div className="flex space-x-2 bg-gray-900">
          <input
            type="text"
            className="p "
            placeholder="Time in Force"
            value={order.tif ?? ''}
            onChange={(e) => handleInputChange(index, 'tif', e.target.value)}
            disabled={order.isActive}
            data-tooltip-id='tif-tooltip'
            data-tooltip-content="Time in Force. Ex.: GTC"
            data-tooltip-place='top'
          />
          <Tooltip id="tif-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="Quantidade"
            value={order.quantity ?? ''}
            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
            disabled={order.isActive}
            data-tooltip-id='qt-tooltip'
            data-tooltip-content="Quantidade. Ex.: 0.02"
            data-tooltip-place='top'
          />
          <Tooltip id="qt-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="Preço"
            value={order.price ?? ''}
            onChange={(e) => handleInputChange(index, 'price', e.target.value)}
            disabled={order.isActive}
            data-tooltip-id='price-tooltip'
            data-tooltip-content="Preço. Ex.: 1000(USD)"
            data-tooltip-place='top'
          />
          <Tooltip id="price-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
        </div>
      );
    }

    if (order.orderType === 'MARKET') {
      return (
        <>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded text-black w-24"
            placeholder="Quantidade"
            value={order.quantity ?? ''}
            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
            disabled={order.isActive}
            data-tooltip-id='qt-tooltip'
            data-tooltip-content="Quantidade. Ex.: 0.02"
            data-tooltip-place='top'
          />
          <Tooltip id="qt-tooltip" opacity={2} style={{ backgroundColor: "rgb(16,89,127)", fontWeight: "bold" }} />
        </>
      );
    }

    return null;
  };

  const renderStrategies = () => {
    return order.map((order, index) => (
      <tr key={index}>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <SelectContract disabled={order.isActive} />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <SelectSide
            onSelect={(orderType) => handleStrategySelect(index, orderType)}
            disabled={order.isActive}
          />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <SelectTimeframe disabled={order.isActive} />
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          {renderAdditionalInputs(order, index)}
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <button
            className={`p-2 border rounded ${order.isActive ? 'bg-green-500' : 'bg-red-500'}`}
            onClick={() => toggleActive(index)}
          >
            {order.isActive ? 'ON' : 'OFF'}
          </button>
        </td>
        <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900">
          <button 
            className={`p-3 bg-secondary border rounded ${order.isActive ? 'cursor-not-allowed opacity-50' : ''}`} 
            onClick={() => !order.isActive && removeStrategy(index)} 
            disabled={order.isActive}
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
              className="mt-2 px-4 py-2 bg-secondary text-white rounded"
              onClick={() => setShowLimitModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <button className="my-4 p-2 bg-secondary text-white rounded" onClick={addOrder}>
        Nova Oferta
      </button>
      <div className="overflow-auto max-h-full">
        <table className="min-w-full bg-gray-800 dark:bg-gray-800 shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">Símbolo</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">Lado</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">Tipo de Oferta</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900">Parameters</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900"></th>
              <th className="py-2 px-4 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-900"></th>
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
