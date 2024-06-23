import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { api } from '../../config/api';
import ConfirmationModal from './componentes/ConfirmationModal';

const Profile = () => {
  const { user, newCurrentUser, currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('user no useEffect', currentUser);
    updateFields();
  }, [currentUser]);

  const updateFields = () => {
    if (currentUser) {
      (document.getElementById('name') as HTMLInputElement).value = currentUser.firstName;
      (document.getElementById('lastName') as HTMLInputElement).value = currentUser.lastName;
      (document.getElementById('email') as HTMLInputElement).value = currentUser.email;
      (document.getElementById('api_token_binance') as HTMLInputElement).value =
        currentUser.api_token_binance;
      (document.getElementById('binance_api_secret') as HTMLInputElement).value =
        currentUser.binance_api_secret;
    }
  };

  const handleEditProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleConfirmEditProfile = async () => {
    setLoading(true);
    setShowModal(false);
    try {
      const response = await api.put(`users/${user?.id}`, {
        firstName: (document.getElementById('name') as HTMLInputElement).value,
        lastName: (document.getElementById('lastName') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        api_token_binance: (document.getElementById('api_token_binance') as HTMLInputElement).value,
        binance_api_secret: (document.getElementById('binance_api_secret') as HTMLInputElement)
          .value
      });
      if(!response.data.success) {
        setError(response.data.message);
      }

      const new_user = response.data;
      newCurrentUser(new_user);
    } catch (error) {
      console.error('ERROR', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-secondary mt-10">
        Editar Perfil
      </h1>
      <div className="flex flex-col md:flex-row mt-10 md:mt-20">
        <div className="flex flex-col items-center md:w-1/2 w-full">
          <img
            src="https://avatars.githubusercontent.com/u/31558600?v=4"
            alt="Profile"
            className="rounded-full w-32 h-32 md:w-80 md:h-80"
          />
        </div>
        <div className="flex flex-col items-center justify-center md:w-1/2 w-full mt-8 md:mt-0">
          <form onSubmit={handleEditProfile} className="flex flex-col max-md:w-full">
            <label htmlFor="name" className="text-lg">
              Nome
            </label>
            <input
              id="name"
              type="text"
              defaultValue={currentUser?.firstName}
              className="border border-gray-300 rounded p-2 w-full md:w-80"
              placeholder="Nome"
            />
            <label htmlFor="password" className="text-lg mt-4">
              Sobrenome
            </label>
            <input
              id="lastName"
              type="text"
              defaultValue={currentUser?.lastName}
              className="border border-gray-300 rounded p-2 w-full md:w-80 mt-2"
              placeholder="Sobrenome"
            />
            <label htmlFor="email" className="text-lg mt-4">
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue={currentUser?.email}
              className="border border-gray-300 rounded p-2 w-full md:w-80 mt-2"
              placeholder="Email"
              readOnly
            />
            <label htmlFor="api_token_binance" className="text-lg mt-4">
              API Key Binance
            </label>
            <input
              id="api_token_binance"
              type="text"
              defaultValue={currentUser?.api_token_binance}
              className="border border-gray-300 rounded p-2 w-full md:w-80 mt-2"
              placeholder="Token Binance"
            />
            <label htmlFor="binance_api_secret" className="text-lg mt-4">
              Secret Key Binance
            </label>
            <input
              id="binance_api_secret"
              type="text"
              defaultValue={currentUser?.binance_api_secret}
              className="border border-gray-300 rounded p-2 w-full md:w-80 mt-2"
              placeholder="Secret Binance"
            />
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 mt-4 w-full md:w-80"
              disabled={loading}>
              {loading ? 'Carregando...' : 'Salvar'}
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
      
      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmEditProfile}
        loading={loading}
      />
    </div>
  );
};

export default Profile;
