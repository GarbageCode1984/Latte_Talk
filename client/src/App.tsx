import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./styles/App.scss";
import Button from "@mui/material/Button";

interface Message {
    text: string;
    user: string;
}
const socket = io("http://localhost:5000");

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        socket.on("message", (msg: Message) => {
            setMessages(prevMessages => [...prevMessages, msg]);
        });
    }, []);

    const user = "You";

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
        <div className="msgContainer">
            <div className="msgBox">
                <div id="messages">
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>
                                {msg.user}: {msg.text}
                            </li>
                        ))}
                    </ul>
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
    );
};

export default App;
