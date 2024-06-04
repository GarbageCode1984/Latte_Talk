import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, createSelector } from "@reduxjs/toolkit";
import "../styles/DeleteButton.scss";
import { deleteRoom } from "../store/thunkFunctions";
import { useNavigate, useParams } from "react-router-dom";

interface State {
    user: {
        userData: {
            name: string;
            _id: string;
        };
    };
    room: {
        rooms: Room[];
    };
}
interface Room {
    _id: string;
    roomName: string;
    isPasswordProtected: boolean;
    creator: string;
    roomUsers: string[];
}

const selectUserId = createSelector(
    (state: State) => state.user.userData._id,
    userId => ({ userId })
);

const DeleteButton = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate();

    const { roomId } = useParams<{ roomId: string }>();
    const { userId } = useSelector(selectUserId);

    const onClickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!roomId) {
            console.error("채팅방 없음!");
            return;
        }
        try {
            await dispatch(deleteRoom({ userId, roomId }));
            navigate("/main");
        } catch (err) {
            console.error("채팅방 삭제 실패", err);
        }
    };

    return (
        <button className="delButton" onClick={onClickHandler}>
            <img src="/delete.png" alt="아이콘 제작자: QudaDesign - Flaticon" />
        </button>
    );
};

export default DeleteButton;
