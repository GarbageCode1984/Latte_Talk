import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./thunkFunctions";
import { toast } from "react-toastify";

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
                toast.info("회원가입에 성공했습니다.");
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.toString() : "Unknown error";
                toast.error(action.payload ? action.payload.toString() : "Unknown error");
            })

            .addCase(loginUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = true;
                localStorage.setItem("accessToken", action.payload.accessToken);
                toast.info("로그인에 성공했습니다.");
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.toString() : "Unknown error";
                toast.error(action.payload ? action.payload.toString() : "Unknown error");
            });
    },
});

export default userSlice.reducer;
