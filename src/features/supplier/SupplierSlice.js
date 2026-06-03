import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import { act } from "react";

export const fetchAllSuppliers = createAsyncThunk("supplier/fetchAllSuppliers", async(_,thunkAPI) => {
    try {
        const response = await axiosInstance.get(`supplier/all`)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch suppliers!")
    }
})

export const fetchSupplierByName = createAsyncThunk("supplier/fetchSupplierByName", async(supplierName,thunkAPI) => {
    try {
        const response = await axiosInstance.get(`supplier/name/${supplierName}`)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch supplier by name!")
    }
})

export const addSupplier = createAsyncThunk("supplier/addSupplier", async(supplierData,thunkAPI) => {
    try {
        const response = await axiosInstance.post(`supplier/add`,supplierData)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to add supplier!")
    }
})

export const updateSupplier = createAsyncThunk("supplier/updateSupplier", async({id,supplierData},thunkAPI) => {
    try {
        const response = await axiosInstance.put(`supplier/update/${id}`,supplierData)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to update supplier!")
    }
})

export const deleteSupplier = createAsyncThunk("supplier/deleteSupplier", async(id, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`supplier/${id}`)
        return id
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to delete supplier!")
    }
})

const initialState = {
    supplier : [],
    isLoading : false,
    error : null
}

const supplierSlice = createSlice({
    name : "supplier",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
           builder
           .addCase(fetchAllSuppliers.pending, (state,action) => {
               state.isLoading = true;
               state.error = null
           })
           .addCase(fetchAllSuppliers.fulfilled ,(state,action) => {
                state.supplier = action.payload;
                state.isLoading = false;
                state.error = null
           })
           .addCase(fetchAllSuppliers.rejected, (state,action) => {
               state.isLoading = false;
               state.error = action.payload;
           })
           .addCase(fetchSupplierByName.pending, (state,action) => {
               state.isLoading = true;
               state.error = null
           })
           .addCase(fetchSupplierByName.fulfilled ,(state,action) => {
                state.supplier = action.payload;
                state.isLoading = false;
                state.error = null
           })
           .addCase(fetchSupplierByName.rejected, (state,action) => {
               state.isLoading = false;
               state.error = action.payload;
           })
           .addCase(addSupplier.pending, (state,action) => {
               state.isLoading = true;
               state.error = null
           })
           .addCase(addSupplier.fulfilled ,(state,action) => {
                state.supplier.push(action.payload);
                state.isLoading = false;
                state.error = null
           })
           .addCase(addSupplier.rejected, (state,action) => {
               state.isLoading = false;
               state.error = action.payload;
           })
           .addCase(updateSupplier.pending, (state,action) => {
               state.isLoading = true;
               state.error = null
           })
           .addCase(updateSupplier.fulfilled ,(state,action) => {
              const index = state.supplier.findIndex((s) => s.id === action.payload.id)
              if(index !== -1){
                state.supplier[index] = action.payload;
            }
            state.isLoading = false;
            state.error = null
           })
           .addCase(updateSupplier.rejected, (state,action) => {
               state.isLoading = false;
               state.error = action.payload;
           })
           .addCase(deleteSupplier.pending, (state,action) => {
               state.isLoading = true;
               state.error = null
           })
           .addCase(deleteSupplier.fulfilled ,(state,action) => {
                state.supplier = state.supplier.filter((s) => s.id !== action.payload )
                state.isLoading = false;
                state.error = null
           })
           .addCase(deleteSupplier.rejected, (state,action) => {
               state.isLoading = false;
               state.error = action.payload;
           })
    }
})

export default supplierSlice.reducer