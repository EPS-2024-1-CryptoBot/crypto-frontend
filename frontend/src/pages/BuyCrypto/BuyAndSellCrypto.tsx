import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import BuyAndSell from './components/BuyAndSell';
import Deposit from './components/Deposit';
const BuyCrypto = () => {

    return (
        <div>
            <Tabs
                className="w-full h-full"
                selectedTabClassName="border-b-2 border-primary"
            >
                <TabList className="w-full flex justify-center space-x-4 p-4 min-h-20 bg-gray-100">
                    <Tab className="flex-grow flex-shrink m-2 nav-item text-center text-xl lg:text-3xl cursor-pointer">
                        <span className="nav-link">Comprar/Vender</span>
                    </Tab>
                    <Tab className="flex-grow flex-shrink m-2 nav-item text-center text-xl lg:text-3xl cursor-pointer">
                        <span className="nav-link">Depositar</span>
                    </Tab>
                    <Tab className="flex-grow flex-shrink m-2 nav-item text-center text-xl lg:text-3xl cursor-pointer">
                        <span className="nav-link">Saque</span>
                    </Tab>
                </TabList>


                <TabPanel>
                    <BuyAndSell />
                </TabPanel>

                <TabPanel>
                {/* <div className="flex justify-center items-center h-full"> */}
                    <Deposit />
                {/* </div> */}
                </TabPanel>

                <TabPanel>
                    <h1>Saque</h1>
                </TabPanel>

            </Tabs>
        </div>
    );
};

export default BuyCrypto;