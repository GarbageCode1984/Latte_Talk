import { useEffect, useState } from "react";
import "../../styles/Main.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getRoom } from "../../store/thunkFunctions";
import SettingsButton from "../../components/SettingsButton";

interface Room {
    _id: string;
    roomName: string;
    isPasswordProtected: boolean;
}

const Main = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState<Room[]>([]);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    useEffect(() => {
        const getRooms = async () => {
            try {
                const actionResult = await dispatch(getRoom());
                const rooms = actionResult.payload;
                setRooms(rooms);
            } catch (err) {
                console.log(err);
            }
        };
        getRooms();
    }, [dispatch]);

    const handleRoomClick = async (roomId: string) => {
        navigate(`/rooms/${roomId}`);
    };

    return (
        <div className="layout">
            <div className="smartPhone">
                <SettingsButton />
                <div className="mainPage">
                    <h1 className="mainH1">채팅방</h1>
                    <ul id="roomList">
                        {rooms && rooms.length > 0 ? (
                            rooms.map(room => (
                                <li className="room" key={room._id} onClick={() => handleRoomClick(room._id)}>
                                    <p className="roomText">{room.roomName}</p>
                                    {room.isPasswordProtected ? <img className="closed" src="/closed.png" /> : ""}
                                </li>
                            ))
                        ) : (
                            <p className="noRoom">방이 없습니다.</p>
                        )}
                    </ul>
                </div>
                <button className="roomCreate" onClick={() => navigate("/create")}>
                    채팅방 생성
                </button>
            </div>
        </div>
    );
};

export default Main;
