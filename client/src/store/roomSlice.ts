import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getRoom, roomCreate, checkPasswordRoom, deleteRoom } from "./thunkFunctions";
import { toast } from "react-toastify";

interface Room {
    _id: string;
    roomName: string;
    isPasswordProtected: boolean;
    creator: string;
    roomUsers: string[];
}

export interface RoomState {
    rooms: Room[];
    isLoading: boolean;
    error: string | null;
}

const initialState: RoomState = {
    rooms: [],
    isLoading: false,
    error: null,
};

const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(roomCreate.pending, state => {
                state.isLoading = true;
            })
            .addCase(roomCreate.fulfilled, (state, action: PayloadAction<Room[]>) => {
                state.isLoading = false;
                state.rooms = action.payload;
            })
            .addCase(roomCreate.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.toString() : "Unknown error";
            })

            .addCase(getRoom.pending, state => {
                state.isLoading = true;
            })
            .addCase(getRoom.fulfilled, (state, action: PayloadAction<Room[]>) => {
                state.isLoading = false;
                state.rooms = action.payload;
            })
            .addCase(getRoom.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.toString() : "Unknown error";
            })

            .addCase(checkPasswordRoom.pending, state => {
                state.isLoading = true;
            })
            .addCase(checkPasswordRoom.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(checkPasswordRoom.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.toString() : "Unknown error";
                toast.error("채팅방 비밀번호가 틀립니다.");
            })

            .addCase(deleteRoom.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<Room[]>) => {
                state.isLoading = false;
                state.rooms = action.payload;
                toast.info("채팅방을 삭제했습니다.");
            })
            .addCase(deleteRoom.rejected, (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.toString() : "Unknown error";
            });
    },
});
export default roomSlice.reducer;
