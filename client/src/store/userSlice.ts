import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./thunkFunctions";

export interface UserState {
    userData: {
        id: string;
        email: string;
        name: string;
        role: number;
        profileImage: string;
    };
    isAuth: boolean;
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    userData: {
        id: "",
        email: "",
        name: "",
        role: 0,
        profileImage: "",
    },
    isAuth: false,
    isLoading: false,
    error: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.toString() : "Unknown error";
            });
    },
});

export default userSlice.reducer;
