import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";


export const fetchAllPurchases = createAsyncThunk("purchase/fetchAllPurchases" , async(_,thunkAPI) => {
    try {
        const response = await axiosInstance.get(`purchase/all`)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch all Purchases!")
    }
})

export const createPurchase = createAsyncThunk("purchase/createPurchase", async(purchaseData,thunkAPI) => {
    try {
        const response = await axiosInstance.post(`purchase/create`,purchaseData)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue("Falied to create Purchase!")
    }
})

export const updateStatus = createAsyncThunk("purchase/updateStatus", async({id,status},thunkAPI) => {
    try {
        await axiosInstance.patch(`purchase/update/${id}?status=${status}`)
        return {id,status}
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to update status!")
    }
})

const initialState = {
    purchase : [],
    isLoading : false,
    error : null
}

const purchaseSlice = createSlice({
    name : "purchase",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllPurchases.pending, (state,action) => {
            state.isLoading = true;
            state.error = null
        })
        .addCase(fetchAllPurchases.fulfilled, (state,action) => {
            state.purchase = action.payload;
            state.isLoading = false;
            state.error = null
        })
        .addCase(fetchAllPurchases.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(createPurchase.pending, (state,action) => {
            state.isLoading = true;
            state.error = null
        })
        .addCase(createPurchase.fulfilled, (state,action) => {
            state.purchase.push(action.payload);
            state.isLoading = false;
            state.error = null
        })
        .addCase(createPurchase.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(updateStatus.pending, (state,action) => {
            state.isLoading = true;
            state.error = null
        })
        .addCase(updateStatus.fulfilled, (state,action) => {
            state.isLoading = false;
            state.error = null
            const {id,status} = action.payload
            const index = state.purchase.findIndex((p) => p.purchaseId === id);
            if(index !== -1){
                state.purchase[index].status = status
            }
        })
        .addCase(updateStatus.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export default purchaseSlice.reducer