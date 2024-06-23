import React from 'react';

interface ConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onClose, onConfirm, loading }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold">Confirmar Atualização</h2>
        <p>Você tem certeza que todas as informações estão corretas?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 text-black rounded p-2 mr-2"
            onClick={onClose}
            disabled={loading}>
            Cancelar
          </button>
          <button
            className="bg-primary text-white rounded p-2"
            onClick={onConfirm}
            disabled={loading}>
            {loading ? 'Carregando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
