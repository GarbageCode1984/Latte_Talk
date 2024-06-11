import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "../../styles/Chat.scss";
import "../../styles/base.scss";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton";
import DeleteButton from "../../components/DeleteButton";
import { createSelector } from "@reduxjs/toolkit";

interface Message {
    user: string;
    userId: string;
    message: string;
    sendDate: Date;
    roomId: string | undefined;
}
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
}

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    const [deleteOnOffButton, setDeleteOnOffButton] = useState(false);
    const { roomId } = useParams();
    const rooms = useSelector((state: State) => state.room.rooms);
    const navigate = useNavigate();
    const location = useLocation();
    const roomKey = location.state?.roomKey;
    const selectUserAndRoom = createSelector(
        (state: State) => state.user.userData.name,
        (state: State) => state.user.userData._id,
        (state: State) => {
            let foundRoom = null;
            if (state.room && state.room.rooms) {
                if (Array.isArray(state.room.rooms)) {
                    const rooms = Object.values(state.room.rooms);
                    foundRoom = rooms.find(r => r._id === roomId);
                } else {
                    foundRoom = state.room.rooms;
                }
            }
            return foundRoom;
        },
        (userName, userId, myRoom) => ({
            user: userName,
            userId,
            myRoom,
        })
    );
    const { user, userId, myRoom } = useSelector(selectUserAndRoom);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    /*  const socket = io("http://localhost:5000", {
        query: { roomId },
    }); */
    const socket = io("https://port-0-latte-talk-jvpb2mloe372no.sel5.cloudtype.app", {
        withCredentials: true,
        transports: ["websocket"],
        query: { roomId },
    });

    function formatTimestamp(timestamp: Date) {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    }

    const messageList = messages.map((msg, index) => (
        <div key={index} className={`${msg.user === user ? "msgContainner" : "msgContainner_you"}`}>
            <li className={`${msg.user === user ? "msgStyle" : "msgStyle_you"}`}>
                {msg.user === user ? (
                    <>
                        <span className="msgText">{msg.message}</span>
                        <span className="msgTime">{formatTimestamp(msg.sendDate)}</span>
                    </>
                ) : (
                    <>
                        <span className="msgUser_you">{msg.user}</span>
                        <span className="msgText_you"> : {msg.message}</span>
                        <span className="msgTime_you">{formatTimestamp(msg.sendDate)}</span>
                    </>
                )}
            </li>
        </div>
    ));

    useEffect(() => {
        if (myRoom && myRoom.creator === userId) {
            setDeleteOnOffButton(true);
        } else {
            setDeleteOnOffButton(false);
        }

        if (roomKey) {
            navigate(`/rooms/${roomId}`);
        } else if (myRoom && myRoom.isPasswordProtected) {
            navigate(`/PasswordCheck/${roomId}`);
        } else {
            navigate(`/rooms/${roomId}`);
        }

        socket.emit("joinRoom", roomId, user);

        socket.on("initialMessages", initialMessages => {
            setMessages(initialMessages);
            scrollToBottom();
        });
        socket.on("message", (msg: Message) => {
            setMessages(prevMessages => [...prevMessages, msg]);
            scrollToBottom();
        });

        socket.emit("requestInitialMessages", roomId);

        return () => {
            socket.emit("leaveRoom", roomId, user);
        };
    }, [roomId, rooms, navigate]);

    const scrollToBottom = () => {
        setTimeout(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            }
        }, 0);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newMessage: Message = {
            user: user,
            userId: userId,
            message: message.trim(),
            sendDate: new Date(),
            roomId: roomId,
        };
        if (!message) {
            return;
        }
        socket.emit("message", newMessage);
        setMessage("");
        scrollToBottom();
    };

    return (
        <div className="layout">
            <div className="smartPhone">
                <NavigateButton />
                {deleteOnOffButton && <DeleteButton />}
                <div className="msgBox">
                    <div id="messages">
                        <ul className="messageList">{messageList}</ul>
                        <div ref={messagesEndRef}></div>
                    </div>

                    <form className="msgSubmit" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            autoComplete="off"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="채팅 입력"
                        />
                        <Button type="submit" variant="outlined" size="small">
                            전송
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;
