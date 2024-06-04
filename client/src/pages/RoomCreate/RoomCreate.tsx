import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import "../../styles/RoomCreate.scss";
import { TextField } from "@mui/material";
import { roomCreate } from "../../store/thunkFunctions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigateButton from "../../components/NavigateButton";

type Inputs = {
    roomName: string;
    roomPassword: string | undefined;
    user: string;
};
interface userName {
    user: {
        userData: {
            _id: string;
        };
    };
}
interface Room {
    _id: string;
}
const RoomCreate = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onChange" });

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate();
    const user = useSelector((state: userName) => state.user.userData._id);
    const [isProtected, setIsProtected] = useState<boolean>(false);

    const onSubmit: SubmitHandler<Inputs> = async ({ roomName, roomPassword }) => {
        let body;
        if (isProtected) {
            body = {
                roomName,
                roomPassword,
                userId: user,
            };
        } else {
            body = {
                roomName,
                roomPassword: undefined,
                userId: user,
            };
        }

        try {
            const { payload } = await dispatch(roomCreate(body));
            if (payload) {
                const createdRoomId = (payload as Room)._id;
                navigate(`/rooms/${createdRoomId}`);
            }
        } catch (err) {
            console.error("채팅방 생성 실패", err);
        }
    };

    const room: { required: string; maxLength: { value: number; message: string } } = {
        required: "필수 필드입니다.",
        maxLength: {
            value: 16,
            message: "최대 16자입니다.",
        },
    };
    const Password: { required: string; minLength: { value: number; message: string } } = {
        required: "필수 필드입니다.",
        minLength: {
            value: 4,
            message: "최소 4자입니다.",
        },
    };

    return (
        <div className="layout">
            <div className="smartPhone">
                <NavigateButton />
                <form className="RoomForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="roomInput">
                        <TextField
                            id="roomName"
                            label="채팅방 이름"
                            variant="outlined"
                            type="text"
                            {...register("roomName", room)}
                        />
                        {errors?.roomName && (
                            <div>
                                <span className="errTeg">{errors.roomName.message}</span>
                            </div>
                        )}
                    </div>

                    <div className="pwdCheck">
                        <div className="pwdText">비밀번호 설정하기</div>
                        <input
                            className="pwdCheckBtn"
                            type="checkbox"
                            checked={isProtected}
                            onChange={e => setIsProtected(e.target.checked)}
                        />
                    </div>

                    {isProtected && (
                        <div className="roomInput">
                            <TextField
                                id="roomName"
                                label="비밀번호 설정"
                                variant="outlined"
                                type="password"
                                {...register("roomPassword", Password)}
                            />
                            {errors?.roomPassword && (
                                <div>
                                    <span className="errTeg">{errors.roomPassword.message}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div>
                        <button className="roomCreateSubmit" type="submit">
                            채팅방 생성
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoomCreate;
