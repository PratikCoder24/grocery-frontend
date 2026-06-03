import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

export const createSale = createAsyncThunk("sale/createSale" , async(saleData,thunkAPI) => {
    try {
        const response = await axiosInstance.post("sale/create",saleData)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to create sale!!")
    }
})

export const fetchAllSale = createAsyncThunk("sale/fetchAllSale" , async(_,thunkAPI) => {
    try {
        const response = await axiosInstance.get("sale/all")
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch sale!!")
    }
})

const initialState = {
    sale : [],
    isLoading : false,
    error : null
}

const saleSlice = createSlice({
    name : 'sale',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
         builder
         .addCase(createSale.pending, (state,action) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(createSale.fulfilled , (state,action) => {
            if(state.sale){
                state.sale.push(action.payload);
                state.isLoading = false;
                state.error = null
            }
         })
         .addCase(createSale.rejected, (state,error) => {
            state.isLoading = false;
            state.error = action.payload
         })
         .addCase(fetchAllSale.pending, (state,action) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(fetchAllSale.fulfilled , (state,action) => {
                state.sale = action.payload;
                state.isLoading = false;
                state.error = null
            
         })
         .addCase(fetchAllSale.rejected, (state,error) => {
            state.isLoading = false;
            state.error = action.payload
         })
    }
})

export default saleSlice.reducer