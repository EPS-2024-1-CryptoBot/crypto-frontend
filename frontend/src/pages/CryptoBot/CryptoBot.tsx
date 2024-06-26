import { FaDownload } from 'react-icons/fa';
import CryptobotMockup from "../../assets/mockup_cryptobot.png";

type OS = 'Windows' | 'MacOS' | 'Linux';

const CryptoBot = () => {
  const getOS = (): OS | 'Unknown' => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) return 'Windows';
    if (userAgent.indexOf('Mac') !== -1) return 'MacOS';
    if (userAgent.indexOf('Linux') !== -1) return 'Linux';
    return 'Unknown';
  };

  const userOS = getOS();
  const otherOS: OS[] = ['Windows', 'MacOS', 'Linux'].filter(os => os !== userOS) as OS[];

  const downloadLinks: Record<OS, string> = {
    Windows: 'https://www.dropbox.com/scl/fi/do7cd7vo5e7a1pven7qnt/cryptobot_windows.zip?rlkey=qeb0r3oyix26aj9vxrl49wkod&st=5lomylo4&dl=1',
    MacOS: 'https://www.dropbox.com/scl/fi/z4mzlcg7jb9yl6so3db5s/cryptobot_macOS.zip?rlkey=4plp0wsixs83ll538v71g98iy&st=hm09wze5&dl=1',
    Linux: 'https://www.dropbox.com/scl/fi/rqpeevubnqx24zdhz4i19/cryptobot_linux.zip?rlkey=865arhu5cncdnunos61n1lnq7&st=pnpba8yq&dl=1',
  };

  return (
    <div className="bg-secondary flex flex-col items-center justify-center min-h-[85vh]">
      <div className="flex flex-col md:flex-row rounded-lg max-w-6xl mx-auto">
        <div className="text-white flex flex-col justify-center md:ml-16">
          <h1 className="md:text-4xl text-3xl font-bold text-center md:text-left">Baixe o CryptoBot para qualquer dispositivo</h1>
          <p className="mt-4 text-center md:text-left">
            Use o CryptoBot para gerenciar seus investimentos em criptomoedas de forma automatizada e eficiente.
            Baixe agora e comece a investir com inteligência!
          </p>
          <div className="flex justify-center mt-4 md:mr-12">
            {userOS !== 'Unknown' ? (
              <a 
                href={downloadLinks[userOS]} 
                className="bg-primary text-white rounded-md p-2 w-48 flex items-center justify-center"
                download
              >
                <FaDownload className="mr-2"/>
                Download for {userOS}
              </a>
            ) : (
              <div className='bg-primary text-white rounded-md p-2 w-full flex items-center justify-center mt-8'>
                Seu sistema operacional ainda não é suportado.
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center md:ml-4">
          <img src={CryptobotMockup} alt="CryptoBot" width={1600} height={1600}/>
        </div>
      </div>
      <div className="flex flex-row items-center -mt-8">
        {otherOS.map((os) => (
          <div
            key={os}
            className={`bg-gray-200 rounded-lg p-4 m-2 flex flex-col items-center`}
          >
            <h2 className="text-black font-bold text-xl">{os}</h2>
            <a 
              href={downloadLinks[os]} 
              className="bg-black text-white rounded-md p-2 w-24 flex items-center justify-center mt-4"
              download
            >
              <FaDownload className="mr-2"/>
              Baixar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoBot;
