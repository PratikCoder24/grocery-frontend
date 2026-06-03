import React from 'react';
import { InventoryLists } from '../Components/index.js';

const InventoryPage = () => {

    return(
         <div className="p-6">

            
            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-white-800">
                        Product Management
                    </h1>

                    <p className="text-white-500 mt-2">
                        Create and manage products
                    </p>
                </div>

           
            </div>

            <InventoryLists />

        </div>
    )
}

export default InventoryPage;