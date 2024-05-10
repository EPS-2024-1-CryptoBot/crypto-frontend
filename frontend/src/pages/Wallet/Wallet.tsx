import { useState, useContext } from 'react';
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';
import { addTransaction } from './routes';
import { AuthContext } from '../../contexts/authContext';

const BuyAndSell = () => {
    const { user } = useContext(AuthContext);
    console.log('user', user);
    const [destination, setDestination] = useState(null);
    const [infoDestination, setInfoDestination] = useState(null as any);

    const getDestination = async (event: React.FormEvent) => {
        event.preventDefault();

        const destination = (event.target as any).destination.value;

        if (destination) {
            setDestination(destination);
            setInfoDestination({
                name: 'John',
                lastName: 'Doe'
            });
        }

        console.log('Get Destination');
    };

    const handleTransfer = async (event: React.FormEvent) => {
        event.preventDefault();
        const quantity = (event.target as any).quantity.value;
        const payload = {
            receiver: "CYTuNG8cBsS3wdohLbjFm3wkEO23",
            amount: quantity,
        };
        const res = await addTransaction(user?.uid, payload);
        console.log('Transfer', res);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row mt-10 md:mt-20 items-center justify-center">
                <div className="flex flex-col items-center md:w-1/2 w-full ">
                    <div className="flex flex-col items-left md:w-1/2 w-full ml-4 pb-1">
                        <span className="text-xl md:text-xl">Transferir</span>
                    </div>
                    <div className="flex flex-col items-left md:w-1/2 w-full pb-4 border-2 border-solid border-primary rounded-md p-4 min-h-[16rem]">
                        <span className='text-xl lg:text-sm pb-4 text-center'>Insira o hash do destinatário</span>
                        <form action="" className='flex flex-col pt-4 rounded p-4' onSubmit={getDestination}>
                            <div className="flex flex-row">
                                <input
                                    type="text"
                                    className="border border-r-0 border-gray-300  p-2 w-full md:w-full"
                                    id="destination"
                                    placeholder='BDSF7askh342bkhjasds'
                                    required
                                    onChange={(event) => event.target.value === '' ? (setDestination(null), setInfoDestination(null)) : null}
                                />
                                <div className="flex flex-row border border-gray-300 p-2">
                                    #
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-primary mt-20 text-white rounded p-2 mt-4 w-full md:w-full hover:bg-secondary transition-all duration-300 cursor-pointer"
                            >
                                Continuar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center md:w-1/2 w-full mt-8 md:mt-0">
                    <div className="flex flex-col items-center md:w-1/2 w-full pb-4 border-2 border-solid border-primary rounded-md min-h-[22rem] min-w-[20rem] p-4">
                        <Tabs
                            className="w-full h-full"
                            selectedTabClassName="border-b-2 border-primary"
                        >
                            <TabList className="w-full flex justify-evenly">
                                <Tab className="m-2 nav-item">
                                    <span className="nav-link text-xl lg:text-xl cursor-pointer">Informações da transferência</span>
                                </Tab>
                            </TabList>

                            <TabPanel className="flex flex-col items-center justify-center">
                                <div className="pt-[1rem]">
                                    {infoDestination && (
                                        <div className="flex flex-row border-gray-300">
                                            Nome: {infoDestination.name} {infoDestination.lastName}
                                        </div>
                                    )}
                                    <form action="" className='flex flex-col pt-4' onSubmit={handleTransfer}>
                                        <label>
                                            Valor
                                        </label>
                                        <div className="flex flex-row sm:mb-10 mb-10">
                                            <input
                                                type="text"
                                                className="border border-r-0 border-gray-300  p-2 w-full sm:w-full"
                                                readOnly={!destination}
                                                disabled={!destination}
                                                id="quantity"
                                                min={1}
                                            />
                                            <div className="flex flex-row border border-gray-300  p-2">
                                                CBU
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-primary text-white rounded p-2 mt-4 w-full md:w-full hover:bg-secondary transition-all duration-300 cursor-pointer"
                                        >
                                            Transferir
                                        </button>
                                    </form>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyAndSell;