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
        console.log(body);
        const response = await axiosInstance.post(`/users/register`, body);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
});

export const loginUser = createAsyncThunk("user/loginUser", async (body: UserLoginBody, thunkAPI) => {
    try {
        console.log(body);
        const response = await axiosInstance.post(`/users/login`, body);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
});
