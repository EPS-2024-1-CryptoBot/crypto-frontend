import React, { useState } from 'react';
import { TabList, TabPanel, Tabs, Tab } from 'react-tabs';
import BuyCoin from '../components/BuyCoin';

const BuyAndSell = () => {

    const [selectedCoin, setSelectedCoin] = useState('BTC');
    return (
        <div className="container mx-auto p-4">

            <div className="flex flex-col md:flex-row mt-10 md:mt-20 items-center justify-center">
                <div className="flex flex-col items-center md:w-1/2 w-full ">
                    <div className="flex flex-col items-left md:w-1/2 w-full ml-4 pb-1">
                        <span className="text-xl md:text-xl">Comprar e Vender</span>
                    </div>
                    <div className="flex flex-col items-left md:w-1/2 w-full pb-4 border-2 border-solid border-primary rounded-md p-4 min-h-[16rem] justify-center">
                        <span
                            className='text-xl lg:text-sm pb-4'>Criptomoedas mais popualres..
                        </span>
                        <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem] pb-2">
                            <input
                                className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
                                type="radio"
                                name="flexRadioDefault"
                                id="BTC"
                                onChange={() => setSelectedCoin('BTC')}
                                checked={selectedCoin === 'BTC'}
                            />
                            <label
                                className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
                                htmlFor="BTC">
                                BTC - Bitcoin
                            </label>
                        </div>

                        <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem] pb-2">
                            <input
                                className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
                                type="radio"
                                name="flexRadioDefault"
                                id="BNB"
                                onChange={() => setSelectedCoin('BNB')}
                            />
                            <label
                                className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
                                htmlFor="BNB">
                                BNB - Binance Coin
                            </label>
                        </div>

                        <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem] pb-2">
                            <input
                                className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
                                type="radio"
                                name="flexRadioDefault"
                                id="ETH"
                                onChange={() => setSelectedCoin('ETH')}
                            />
                            <label
                                className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
                                htmlFor="ETH">
                                ETH - Ethereum
                            </label>
                        </div>

                        <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                            <input
                                className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
                                type="radio"
                                name="flexRadioDefault"
                                id="USDT"
                                onChange={() => setSelectedCoin('USDT')}
                            />
                            <label
                                className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
                                htmlFor="USDT">
                                USDT - Tether
                            </label>
                        </div>
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
                                    <span className="nav-link text-xl lg:text-xl cursor-pointer">Comprar</span>
                                </Tab>
                                <Tab className="m-2 nav-item text-xl lg:text-xl cursor-pointer">
                                    <span className="nav-link">Vender</span>
                                </Tab>
                            </TabList>

                            <TabPanel  className="flex flex-col items-center justify-center">
                                <div className="pt-[1rem]">
                                    <form action="" className='flex flex-col pt-4'>
                                        <label>
                                            Pagar
                                        </label>
                                        <div className="flex flex-row">
                                            <input
                                                type="number"
                                                min={0}
                                                defaultValue={0}
                                                className="border border-r-0 border-gray-300  p-2 w-full md:w-full"
                                            />
                                            <div className="flex flex-row border border-gray-300  p-2">
                                                R$
                                            </div>
                                        </div>
                                        <label>
                                            Recebe
                                        </label>
                                        <div className="flex flex-row sm:mb-20 mb-10">

                                            <input
                                                type="text"
                                                className="border border-r-0 border-gray-300  p-2 w-full sm:w-full"
                                                readOnly
                                                disabled
                                            />
                                            <div className="flex flex-row border border-gray-300  p-2">
                                                {selectedCoin}
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-primary text-white rounded p-2 mt-4 w-full md:w-full hover:bg-secondary transition-all duration-300 cursor-pointer"
                                        >
                                            Comprar
                                        </button>
                                    </form>

                                </div>

                            </TabPanel>

                            <TabPanel className="flex flex-col items-center justify-center">
                                <div className="pt-[1rem]">
                                    <form action="" className='flex flex-col pt-4'>
                                        <label>
                                            Quantidade
                                        </label>
                                        <div className="flex flex-row ">

                                            <input
                                                type="text"
                                                className="border border-r-0 border-gray-300  p-2 w-full sm:w-full"

                                            />
                                            <div className="flex flex-row border border-gray-300  p-2">
                                                {selectedCoin}
                                            </div>
                                        </div>
                                        <label>
                                            Recebe
                                        </label>
                                        <div className="flex flex-row sm:mb-20 mb-10">
                                            <input
                                                type="number"
                                                min={0}
                                                defaultValue={0}
                                                className="border border-r-0 border-gray-300  p-2 w-full md:w-full"
                                                readOnly
                                                disabled
                                            />
                                            <div className="flex flex-row border border-gray-300 p-2">
                                                R$
                                            </div>
                                        </div>


                                        <button
                                            type="submit"
                                            className="bg-primary text-white rounded p-2 mt-4 w-full md:w-full hover:bg-secondary transition-all duration-300 cursor-pointer"
                                        >
                                            Vender
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

{/* <div className="flex flex-col items-center md:w-1/2 w-full">
                                <label className="particles-checkbox-container">
                                    <input type="radio" className="particles-checkbox" name="toggle"/>
                                        <span>Sliver</span>
                                </label>

                                <label className="particles-checkbox-container">
                                    <input type="radio" className="particles-checkbox" name="toggle"/>
                                        <span>Royla Blue</span>
                                </label>

                                <label className="particles-checkbox-container">
                                    <input type="radio" className="particles-checkbox" name="toggle"/>
                                        <span>Dark Gray</span>
                                </label>

                                <a href="https://codepen.io/chandrashekhar" className="link" target="_blank">My Other Pens</a>
                            </div> */}