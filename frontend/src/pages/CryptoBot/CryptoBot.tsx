import { FaDownload } from 'react-icons/fa';
import CryptobotMockup from "../../assets/mockup_cryptobot.png";

const CryptoBot = () => {
  const getOS = () => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) return 'Windows';
    if (userAgent.indexOf('Mac') !== -1) return 'MacOS';
    if (userAgent.indexOf('Linux') !== -1) return 'Linux';
    return 'your OS';
  };

  return (
    <div className="bg-secondary flex items-center justify-center h-[80vh]">
      <div className="flex rounded-lg max-w-4xl mx-auto">
        <div className="text-white flex flex-col justify-center ml-5">
          <h1 className="text-4xl font-bold">Baixe o CryptoBot para qualquer dispositivo</h1>
          <p className="mt-4">
            Use o CryptoBot para gerenciar seus investimentos em criptomoedas de forma automatizada e eficiente.
            Baixe agora e comece a investir com inteligência!
          </p>
          <div className="flex justify-center mt-4">
            <button className="bg-primary text-white rounded-md p-2 w-48 flex items-center justify-center mr-2">
              <FaDownload className="mr-2"/>
              Download for {getOS()}
            </button>
          </div>
        </div>
        <div className="flex justify-center ml-4">
          <img src={CryptobotMockup} alt="CryptoBot" width={1400} height={1400}/>
        </div>
      </div>
    </div>
  );
};

export default CryptoBot;
