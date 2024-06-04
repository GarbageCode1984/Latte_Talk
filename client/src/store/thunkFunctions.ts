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
type RoomCreateBody = {
    roomName: string;
    roomPassword?: string;
    userId: string;
};
type RoomCheckPasswordBody = {
    password: string;
    roomId: string;
};
type RoomDeleteBody = {
    userId: string;
    roomId: string;
};
type UserDeleteBody = {
    userId: string;
};

export const registerUser = createAsyncThunk("user/registerUser", async (body: UserRegisterBody, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/users/register`, body, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
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

export const roomCreate = createAsyncThunk("room/roomCreate", async (body: RoomCreateBody, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/rooms/create`, body, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
});

export const getRoom = createAsyncThunk("room/getRoom", async () => {
    try {
        const response = await axiosInstance.post(`/rooms/getRoom`);
        return response.data;
    } catch (error: any) {
        return error.response.data || error.message;
    }
});

export const checkPasswordRoom = createAsyncThunk(
    "room/checkPasswordRoom",
    async (body: RoomCheckPasswordBody, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/rooms/checkRoom`, body);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
);

export const deleteRoom = createAsyncThunk("room/deleteRoom", async (body: RoomDeleteBody, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`/rooms/deleteRoom`, {
            data: body,
        });
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
});

export const DeleteAccountUser = createAsyncThunk("user/DeleteAccountUser", async (body: UserDeleteBody, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`/users/DeleteAccount`, { data: body });
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
});
