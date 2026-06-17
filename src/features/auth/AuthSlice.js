import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

const getInitialUser = () => {
    const token = localStorage.getItem("token");
    if(!token) return null;

    try{
    const payload = JSON.parse(atob(token.split(".")[1]));

    if(payload.exp * 1000 < Date.now()){
        localStorage.removeItem("token");
        return null;
    } 

    return {email:payload.sub , role:payload.role};
    }catch(error){
        localStorage.removeItem("token")
        return error;
    }
}

export const loginUser = createAsyncThunk("auth/loginUser", async(credentials, thunkAPI) => {
    try{
        const response = await axiosInstance.post(`auth/login`,credentials);
        const token = response.data.token;
        localStorage.setItem("token",token);
        const payload = JSON.parse(atob(token.split(".")[1]));
        return {email : payload.sub , role : payload.role};
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Invalid Credentials");
    }
})

export const registerUser = createAsyncThunk("auth/registerUser", async(userData , thunkAPI) => {
    try{
        const response = await axiosInstance.post(`auth/register`,userData);
        return response.data;

    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration Failed");
    }
})

export const getAllUsers = createAsyncThunk("users/getAllUsers" , async(_,thunkAPI) => {
    try {
        const response = await axiosInstance.get(`users/all`)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch Users!")
    }
})

export const promoteUser = createAsyncThunk("auth/promoteUser", async(id,thunkAPI) => {
    try {
        await axiosInstance.put(`auth/promote/${id}`)
        return id
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to promote user!")
    }
})


const initialState = {
    user : getInitialUser(),
    isLoading : false,
    error : null,
    registrationSuccess : false,
    users : [],
    usersLoading : false,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        logout : (state) => {
            localStorage.removeItem("token");
            state.user = null;
            state.error = null;
        },
        clearAuthError : (state) => {
            state.error = null;
            state.registrationSuccess = false;
        }
    },
    extraReducers : (builder) => {
             builder
             .addCase(loginUser.pending , (state,action) => {
                state.isLoading = true;
                state.error = null;
             })
             .addCase(loginUser.fulfilled, (state,action) => {
                state.isLoading = false;
                state.user = action.payload;
             })
             .addCase(loginUser.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
             })
             .addCase(registerUser.pending , (state,action) => {
                state.isLoading = true;
                state.error = null;
                state.registrationSuccess = false;
             })
             .addCase(registerUser.fulfilled, (state,action) => {
                state.isLoading = false;
                state.registrationSuccess = true;
             })
             .addCase(registerUser.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
             })
             .addCase(getAllUsers.pending, (state) => {
                state.usersLoading = true;
                state.error = null;
             })
             .addCase(getAllUsers.fulfilled, (state, action) => {
                state.usersLoading = false;
                state.users = action.payload;
             })
             .addCase(getAllUsers.rejected, (state, action) => {
                state.usersLoading = false;
                state.error = action.payload;
             })
             .addCase(promoteUser.fulfilled, (state, action) => {
                const promotedId = action.payload;
                state.users = state.users.map((u) =>
                    u.id === promotedId ? { ...u, role: "ROLE_ADMIN" } : u
                );
             })
             .addCase(promoteUser.rejected, (state, action) => {
                state.error = action.payload;
             })
    }
})

export default authSlice.reducer;
export const {logout , clearAuthError} = authSlice.actions;