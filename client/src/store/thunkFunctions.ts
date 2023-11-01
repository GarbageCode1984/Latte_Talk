import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

type UserRegisterBody = {
    email: string;
    password: string;
    name: string;
};

type UserLoginBody = {
    email: string;
    password: string;
};

export const registerUser = createAsyncThunk("user/registerUser", async (body: UserRegisterBody, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/users/register`, body, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
});

export const loginUser = createAsyncThunk("user/loginUser", async (body: UserLoginBody, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/users/login`, body, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
});

export const authUser = createAsyncThunk("user/authUser", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/users/auth`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
});
