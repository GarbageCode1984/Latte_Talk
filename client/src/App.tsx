import React, { useEffect, useState } from "react";
import io from "socket.io-client";

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
        setMessages([...messages, newMessage]);
        setMessage("");
        console.log(newMessage);
        socket.emit("message", newMessage);
    };

    return (
        <div>
            <div id="messages">
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            {msg.user}: {msg.text}
                        </li>
                    ))}
                </ul>
            </div>

            <form onSubmit={handleSubmit}>
                <input autoComplete="off" value={message} onChange={e => setMessage(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default App;
