import {configureStore } from '@reduxjs/toolkit';
import {
    categoryReducer,
    productReducer,
    inventoryReducer,
    saleReducer,
    supplierReducer,
    purchaseReducer,
    authReducer,

} from '../features/index.js';


export const Store = configureStore({
    reducer : {
        category : categoryReducer,
        products : productReducer,
        inventory : inventoryReducer,
        sale : saleReducer,
        supplier : supplierReducer,
        purchase : purchaseReducer,
        auth : authReducer,
    },
});
