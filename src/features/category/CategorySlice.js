import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axiosInstance';


export const fetchCategories = createAsyncThunk('category/fetchCategories', async (_,thunkAPI) => {
    try {
        const response = await axiosInstance.get('category/all');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message ||
                'Failed to fetch categories');
    }
});

export const addCategory = createAsyncThunk('category/addCategory', async (categoryData, thunkAPI) => {
    try {
        const response = await axiosInstance.post('category/add', categoryData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message ||
                'Failed to add category');
    }
});

export const updateCategory = createAsyncThunk('category/updateCategory', async ({id, categoryData}, thunkAPI) => {
    try {
        const response = await axiosInstance.put(`category/update/${id}`, categoryData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message ||
                'Failed to update category');
    }
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id, thunkAPI) => {
    try {
        await axiosInstance.delete(`/category/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message ||
                'Failed to delete category');
    }   
});

const initialState = {
    categories : [],
    isLoading : false,
    error : null,
};

const categorySlice = createSlice({
    name : 'category',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchCategories.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        }
        )
        .addCase(fetchCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(addCategory.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories.push(action.payload);
            state.error = null;
        })
        .addCase(addCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(updateCategory.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
            state.error = null;
        })
        .addCase(updateCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(deleteCategory.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = state.categories.filter((cat) => cat.id !== action.payload);
            state.error = null;
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    }
})


export default categorySlice.reducer;