import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("/");

interface Message {
  body: string;
  from: string;
}

export default function ChatIO() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (newMessage: Message) =>{
  console.log('Mensaje recibido del servidor:', newMessage);
    setMessages((state) => [newMessage, ...state]);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newMessage: Message = {
      body: message,
      from: "Me",
    };
    console.log('Enviando mensaje al servidor: ',newMessage );
    
    setMessages((state) => [newMessage, ...state]);
    setMessage("");
    socket.emit("message", newMessage.body);
  };

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2">Chat React</h1>
        <input
          name="message"
          type="text"
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-zinc-500 p-2 w-full text-black"
          value={message}
          autoFocus
        />

        <ul className="h-80 overflow-y-auto">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`my-2 p-2 table text-sm rounded-md ${
                msg.from === "Me" ? "bg-sky-700 ml-auto" : "bg-black"
              }`}
            >
              <b>{msg.from}</b>: {msg.body}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

