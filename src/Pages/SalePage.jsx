import React, { useState } from 'react';
import { SaleForm , SaleLists } from '../Components/index.js';

const SalePage = () => {

    const [show, setShow] = useState(false);

    return (
        <div className="p-6">

            
            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-white-800">
                        Sale Management
                    </h1>

                    <p className="text-white-500 mt-2">
                        Create and manage Sales
                    </p>
                </div>

           
                <button
                    onClick={() => setShow(!show)}
                    className="
                        bg-indigo-600
                        hover:bg-indigo-700
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        transition
                    "
                >
                    {show ? 'Close Form' : 'Create Sale'}
                </button>

            </div>

      
            {show && (
                <div className="mb-10">
                    <SaleForm />
                </div>
            )}

            <SaleLists />

        </div>
    );
};

export default SalePage;