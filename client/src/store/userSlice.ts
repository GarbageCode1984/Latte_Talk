import { createSlice } from "@reduxjs/toolkit";
import { DeleteAccountUser, authUser, logOut, loginUser, registerUser } from "./thunkFunctions";
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
            .addCase(registerUser.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.toString() : "Unknown error";
                toast.error(action.payload ? action.payload.toString() : "Unknown error");
            })

            .addCase(loginUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: any) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = true;
                localStorage.setItem("accessToken", action.payload.accessToken);
                toast.info("로그인에 성공했습니다.");
            })
            .addCase(loginUser.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.toString() : "Unknown error";
                toast.error(action.payload ? action.payload.toString() : "Unknown error");
            })

            .addCase(authUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(authUser.fulfilled, (state, action: any) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = true;
            })
            .addCase(authUser.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.toString() : "Unknown error";
                state.userData = initialState.userData;
                state.isAuth = false;
                localStorage.removeItem("accessToken");
            })

            .addCase(DeleteAccountUser.pending, state => {
                state.isLoading = true;
            })
            .addCase(DeleteAccountUser.fulfilled, (state, action: any) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = false;
                localStorage.removeItem("accessToken");
                toast.info("계정을 삭제했습니다.");
            })
            .addCase(DeleteAccountUser.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.toString() : "Unknown error";
                toast.error(action.payload ? action.payload.toString() : "Unknown error");
            })

            .addCase(logOut.pending, state => {
                state.isLoading = true;
            })
            .addCase(logOut.fulfilled, (state, action: any) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = false;
                localStorage.removeItem("accessToken");
                toast.info("로그아웃에 성공했습니다.");
            })
            .addCase(logOut.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.toString() : "Unknown error";
                toast.error(action.payload ? action.payload.toString() : "Unknown error");
            });
    },
});

export default userSlice.reducer;
