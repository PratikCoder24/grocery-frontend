import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

export const fetchProducts = createAsyncThunk(`products/fetchProducts`, async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`products/all`)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message ||
            'Failed to fetch products!');
    }
})

export const addProducts = createAsyncThunk(`products/addProducts`, async (productData, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`products/add`,productData)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.data?.message ||
            'Failed to add product!');
    }
})

export const updateProducts = createAsyncThunk(`products/updateProducts`, async ({ id, productData }, thunkAPI) => {
    try {
        const response = await axiosInstance.put(`products/update/${id}`, productData)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.data?.message ||
            'Failed to update product!');
    }
})

export const deleteProducts = createAsyncThunk(`products/deleteProducts`, async (id, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`products/${id}`)
        return id
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.data?.message ||
            'Failed to delete product!'
        );
    }
})

const initialState = {
    products: [],
    isLoading: false,
    error: null,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch products!';
            })
            .addCase(addProducts.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addProducts.fulfilled, (state, action) => {
                if (state.products) {
                    state.products.push(action.payload);
                    state.isLoading = false;
                    state.error = null;
                }
            })
            .addCase(addProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add product!';
            })
            .addCase(updateProducts.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProducts.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                    state.isLoading = false;
                    state.error = null;
                }
            })
            .addCase(updateProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update product!';
            })
            .addCase(deleteProducts.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.products = state.products.filter((p) => p.id !== action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete product!';
            })
    }
})

export default productSlice.reducer;
