import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../../styles/Chat.scss";
import "../../styles/base.scss";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

interface Message {
    text: string;
    user: string;
}
interface userName {
    user: {
        userData: {
            name: string;
        };
    };
}

const socket = io("http://localhost:5000");

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    // const user = "You";
    const user = useSelector((state: userName) => state.user.userData.name);

    const messageList = messages.map((msg, index) => (
        <li key={index} className="msgStyle">
            <span className="megUser">{msg.user} : </span>
            <span className="megText">{msg.text}</span>
        </li>
    ));

    useEffect(() => {
        socket.on("initialMessages", initialMessages => {
            setMessages(initialMessages);
        });
        socket.on("message", (msg: Message) => {
            setMessages(prevMessages => [...prevMessages, msg]);
        });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newMessage: Message = {
            text: message,
            user: user,
        };
        setMessage("");
        socket.emit("message", newMessage);
    };

    return (
        <div className="layout">
            <div className="smartPhone">
                <div className="msgBox">
                    <div id="messages">
                        <ul>{messageList}</ul>
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

/* 
    1. 클라에서 보낸 메세지, 닉네임이 서버로 전달함
    2. 서버에서 해당 유저 닉네임과 메세지를 다시 클라쪽으로 전송
    3. 클라에서 유저 닉네임과 메시지 내용을 화면에 뿌려줌
*/
