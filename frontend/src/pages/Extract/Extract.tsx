import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../config/api';
import { AuthContext } from '../../contexts/authContext';

type Transaction = {
  sender: string;
  receiver: string;
  amount: number;
};

type TransactionSignature = {
  signature: string;
  public_key: string;
};

type BlockTransaction = {
  transaction: Transaction;
  signature: TransactionSignature;
};

export type Block = {
  index: string;
  timestamp: string;
  transactions: BlockTransaction[];
  proof: number;
  previous_hash: string;
};

const Extract = () => {
  const { currentUser } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [extrato, setExtrato] = useState([]);
  const [blockchain, setBlockchain] = useState<Block[]>([]);
  const [expandedIframe, setExpandedIframe] = useState(false);

  const handleBalance = async () => {
    try {
      const response = await api.get('/wallet/balance');
      setBalance(response.data.balance);
      console.log('Balance:', response.data);
    } catch (error: any) {
      console.log('Balance:', error?.response?.data);
    }
  };

  const handleTransactions = async () => {
    try {
      const response = await api.get('/wallet/transactions');
      if (response.data.length > 0) {
        setExtrato(response.data);
      }
      console.log('Transactions:', response.data);
    } catch (error: any) {
      console.log('Transactions:', error?.response?.data);
    }
  };

  const handleGetBlockChain = async () => {
    try {
      const response = await api.get('/wallet/blockchain');
      if (Object.prototype.hasOwnProperty.call(response.data, 'chain')) {
        setBlockchain(response.data.chain);

        const jsonCrackEmbed = document.getElementById('jsoncrackEmbed') as HTMLIFrameElement;

        const json = JSON.stringify({ 'CBU BLOCKCHAIN': response.data.chain });

        const options = {
          theme: 'light', // "light" or "dark"
          direction: 'RIGHT' // "UP", "DOWN", "LEFT", "RIGHT"
        };
        // NOSONAR
        jsonCrackEmbed.contentWindow?.postMessage(
          {
            json,
            options
          },
          '*' // NOSONAR
        );
      }
    } catch (error: any) {
      console.log('Blockchain error:', error?.response?.data);
    }
  };

  const retrieveData = async () => {
    handleBalance();
    handleTransactions();
    handleGetBlockChain();
  };

  const handleMine = async () => {
    const response = await api.post('/wallet/mine');
    console.log('Mine:', response.data);
    retrieveData();
  };

  useEffect(() => {
    retrieveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center gap-10 p-4 md:p-10">
      <div className="flex flex-col md:flex-row justify-center w-full">
        <div className="w-full md:w-1/2 pt-[1rem] md:mr-5">
          <div className="border-2 border-solid border-primary rounded-md p-4 min-h-[16rem] flex flex-col justify-between ">
            <span className="text-3xl">Saldo Atual </span>
            <div className="pt-4 text-6xl font-bold text-primary lg:text-8xl">{balance} CBUs</div>
            <span>
              <strong className="uppercase">ID para transações: </strong>
              {currentUser?.firebaseUid}
            </span>
          </div>
          <div className="flex flex-row pt-2">
            <div className="flex gap-4 w-full">
              <Link to="/transfer" className="w-[50%]">
                <button className="bg-primary text-white rounded-md p-2 w-full">Transferir</button>
              </Link>
              <button
                className="bg-secondary text-white rounded-md p-2 w-[50%] disabled:opacity-45"
                disabled={!blockchain?.[0]?.index}
                onClick={handleMine}>
                  
                Minerar
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 pt-[1rem] ml-auto mr-auto">
          <div className="border-2 border-solid border-primary rounded-md p-4 min-h-[16rem] flex flex-col justify-center items-end gap-2">
            <iframe
              id="jsoncrackEmbed"
              src="https://jsoncrack.com/widget"
              width={`100%`}
              height={`100%`}
              style={
                expandedIframe
                  ? {
                      position: 'fixed',
                      width: '80%',
                      height: '80%',
                      transform: 'translate(-50%, -50%)',
                      top: '50%',
                      left: '50%'
                    }
                  : undefined
              }
            />
            <button
              className="bg-primary p-2 rounded text-white"
              onClick={() => setExpandedIframe(!expandedIframe)}>
              {expandedIframe ? `Diminuir` : `Expandir`}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[40%]">
        <span className="text-xl md:text-4xl">Histórico de transações na blockchain</span>
        <div className="">
          <table className=" w-full">
            <thead>
              <tr>
                <th>Enviado por</th>
                <th>Recebido por</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {extrato.map((transaction: Transaction, index: number) => (
                <tr
                  key={index}
                  className="border-2 border-solid border-primary rounded-md p-4 min-h-[10rem]">
                  <td className="text-center text-xl font-bold text-secondary">
                    {transaction.sender}
                  </td>
                  <td className="text-center text-xl font-bold text-secondary">
                    {transaction.receiver}
                  </td>
                  <td className="text-center text-xl font-bold text-secondary">
                    R$ {transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Extract;
