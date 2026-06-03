
import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance';


export const fetchInventory = createAsyncThunk("inventory/fetchInventory", async(_,thunkAPI) => {
 try{
    const response = await axiosInstance.get(`/inventory/all`)
    return response.data 
 }catch(error){
    return thunkAPI.rejectWithValue("Failed to fetch inventory!")
 }
})

export const fetchLowStock = createAsyncThunk("inventory/fetchLowStock", async(_,thunkAPI) => {
    try{
       const response = await axiosInstance.get(`/inventory/low-stock`)
       return response.data 
    }catch(error){
         return thunkAPI.rejectWithValue("Failed to fetch low stock items!")
    }
})

export const addStock = createAsyncThunk("inventory/addStock" , async({id,inventoryData},thunkAPI) => {
    try{
        const response = await axiosInstance.patch(`/inventory/add-stock/${id}`, inventoryData)
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue("Failed to add stock!")
    }
})

export const reduceStock = createAsyncThunk("inventory/reduceStock" , async({id,inventoryData},thunkAPI) => {
    try{
        const reponse = await axiosInstance.patch(`/inventory/reduce-stock/${id}`, inventoryData)
        return reponse.data
    }catch(error){
        return thunkAPI.rejectWithValue("Failed to reduce stock!")
    }
})


const initialState = {
    inventory : [],
    isLoading : false,
    error : null
}

const inventorySlice = createSlice({
    name : "inventory",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchInventory.pending,(state,action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchInventory.fulfilled, (state,action) => {
            state.isLoading = false;
            state.inventory = action.payload;
            state.error = null;
        })
        .addCase(fetchInventory.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(fetchLowStock.pending, (state,error) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchLowStock.fulfilled, (state,action) => {
            state.isLoading = false;
            state.inventory = action.payload;
            state.error = null;
        })
        .addCase(fetchLowStock.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(addStock.pending, (state,action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addStock.fulfilled, (state,action) => {
            const index = state.inventory.findIndex((p) => p.id === action.payload.id)
            if(index !== -1){
                state.inventory[index] = {
                    ...state.inventory,
                    ...action.payload};
                state.isLoading = false;
                state.error = null;
            }
        })
        .addCase(addStock.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(reduceStock.pending, (state,action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(reduceStock.fulfilled, (state,action) => {
            const index = state.inventory.findIndex((p) => p.id === action.payload.id)
            if(index !== -1){
                state.inventory[index] = {
                    ...state.inventory,
                    ...action.payload};
                state.isLoading = false;
                state.error = null;
            }
        })
        .addCase(reduceStock.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    }
})

export default inventorySlice.reducer