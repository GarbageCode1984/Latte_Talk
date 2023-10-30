import React, { useEffect, useRef, useState } from "react";
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
    const user = useSelector((state: userName) => state.user.userData.name);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const messageList = messages.map((msg, index) => (
        <div key={index} className={`${msg.user === user ? "msgContainner" : "msgContainner_you"}`}>
            <li className={`${msg.user === user ? "msgStyle" : "msgStyle_you"}`}>
                <span className={`${msg.user === user ? "msgUser" : "msgUser_you"}`}>{msg.user} : </span>
                <span className={`${msg.user === user ? "msgText" : "msgText_you"}`}>{msg.text}</span>
            </li>
        </div>
    ));

    useEffect(() => {
        socket.on("initialMessages", initialMessages => {
            setMessages(initialMessages);
            scrollToBottom();
        });
        socket.on("message", (msg: Message) => {
            setMessages(prevMessages => [...prevMessages, msg]);
            scrollToBottom();
        });
    }, []);

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
            text: message,
            user: user,
        };
        setMessage("");
        socket.emit("message", newMessage);
        scrollToBottom();
    };

    return (
        <div className="layout">
            <div className="smartPhone">
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
