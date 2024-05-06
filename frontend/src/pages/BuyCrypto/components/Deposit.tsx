import React from "react";

const Deposit = () => {

    const handleDeposit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Deposit');
    };
    
    return (
        <div className="container mx-auto p-4 justify-center items-center">
            <div>
                <div className="flex flex-col items-center justify-center">
                    <div className="pt-[1rem]">
                        <form action="" className='flex flex-col pt-4 bg-gray-100 rounded p-4' onSubmit={handleDeposit}>
                            
                            <label htmlFor="deposit" className="text-lg mt-5">
                                Valor
                            </label>
                            <div className="flex flex-row">
                                <input
                                    type="number"
                                    min={0}
                                    defaultValue={0}
                                    className="border border-r-0 border-gray-300  p-2 w-full md:w-full"
                                    id="deposit"
                                />
                                <div className="flex flex-row border border-gray-300  p-2">
                                    R$
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-primary text-white rounded p-2 mt-4 w-full md:w-full hover:bg-secondary transition-all duration-300 cursor-pointer"
                            >
                                Depositar
                            </button>
                        </form>

                    </div>

                </div>


            </div>
        </div>

    );
}

export default Deposit;