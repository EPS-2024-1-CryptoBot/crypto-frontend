import { useState, useContext } from 'react';
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';
import { addTransaction, getUserDestination } from './routes';
import { AuthContext } from '../../contexts/authContext';

const Transfer = () => {
  const { user } = useContext(AuthContext);
  const [destination, setDestination] = useState(null);
  const [infoDestination, setInfoDestination] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const getDestination = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const destination = (event.target as any).destination.value;
  
    try {
      const res = await getUserDestination(destination);
      console.log(res);
      setDestination(destination);
      setInfoDestination(res);
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Failed to get destination information.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleTransfer = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const quantity = (event.target as any).quantity.value;
    const payload = {
      receiver: destination,
      amount: quantity
    };

    try {
      const res = await addTransaction(user?.uid, payload);
      setMessage('Transfer successful!');
    } catch (error) {
      setMessage('Transfer failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row mt-10 md:mt-20 items-start justify-between">
        <div className="flex flex-col items-center md:w-[48%] w-full">
          <div className="flex flex-col items-left w-full pb-4 border-2 border-solid border-primary rounded-md p-6 min-h-[20rem] bg-white shadow-lg">
            <div className="flex flex-col items-left w-full pb-1">
              <span className="text-2xl font-bold">Transferir</span>
            </div>
            <span className="text-lg pb-4 text-center">Insira o hash do destinatário</span>
            <form action="" className="flex flex-col pt-4 rounded" onSubmit={getDestination}>
              <div className="flex flex-row">
                <input
                  type="text"
                  className="border border-r-0 border-gray-300 p-2 w-full"
                  id="destination"
                  placeholder="BDSF7askh342bkhjasds"
                  required
                  onChange={(event) => {
                    setInfoDestination(null);
                    setDestination(event.target.value as any);
                  }}
                />
                <div className="flex flex-row border border-gray-300 p-2 bg-gray-100">#</div>
              </div>
              <button
                type="submit"
                className={`bg-primary mt-4 text-white rounded p-2 w-full hover:bg-secondary transition-all duration-300 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}>
                {loading ? 'Loading...' : 'Continuar'}
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:w-[48%] w-full mt-8 md:mt-0">
          <div className="flex flex-col items-center w-full pb-4 border-2 border-solid border-primary rounded-md min-h-[20rem] p-6 bg-white shadow-lg">
            <Tabs className="w-full h-full" selectedTabClassName="border-b-2 border-primary">
              <TabList className="w-full flex justify-center">
                <Tab className="m-2 nav-item">
                  <span className="nav-link text-xl cursor-pointer">
                    Informações da transferência
                  </span>
                </Tab>
              </TabList>
              <TabPanel className="flex flex-col items-center justify-center">
                <div className="pt-4 w-full">
                  {infoDestination && (
                    <div className="mb-4">
                      <div className="flex flex-row border-b border-gray-300 pb-2">
                        <span className="font-semibold">Nome:</span> {infoDestination.firstName}{' '}
                        {infoDestination.lastName}
                      </div>
                      <div className="border-b border-gray-300 pb-2">
                        <span className="font-semibold">Email:</span> {infoDestination.email}
                      </div>
                      <div className="border-b border-gray-300 pb-2">
                        <span className="font-semibold">Hash:</span> {infoDestination.firebaseUid}
                      </div>
                    </div>
                  )}
                  <form action="" className="flex flex-col pt-4" onSubmit={handleTransfer}>
                    <label className="font-semibold mb-2">Valor</label>
                    <div className="flex flex-row mb-6">
                      <input
                        type="number"
                        className="border border-r-0 border-gray-300 p-2 w-full"
                        readOnly={!destination}
                        disabled={!destination}
                        id="quantity"
                        min={1}
                        required
                      />
                      <div className="flex flex-row border border-gray-300 p-2 bg-gray-100">
                        CBU
                      </div>
                    </div>
                    <button
                      type="submit"
                      className={`bg-primary text-white rounded p-2 w-full hover:bg-secondary transition-all duration-300 cursor-pointer ${!destination || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!destination || loading}>
                      {loading ? 'Processing...' : 'Transferir'}
                    </button>
                  </form>
                  {message && (
                    <div
                      className={`mt-4 p-2 text-center ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                      {message}
                    </div>
                  )}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
