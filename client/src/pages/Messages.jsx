import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
// Importing socket.io client
import { io } from "socket.io-client";

const Messages = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(["MSG1", "MSG2", "MSG3"]);
  const [socket] = useState(() => io("http://localhost:6969"));

  // Initializing socket connection
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with ID: " + socket.id);
    });

    socket.on("receive-msg", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMsg = () => {
    if (!newMessage.trim()) return;
    if (!socket) return;

    setMessages((prev) => [...prev, newMessage]);
    setNewMessage("");
    socket.emit("send-msg", newMessage);
    console.log("hitt");
  };

  return (
    <>
      <div className="flex min-h-screen bg-white text-black">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6">
          <h1 className="outline text-center">YOU ARE ON ME33AGES PAGE</h1>
          <div className="outline mt-4">
            <h1 className="font-bold pb-2">All Messages</h1>
            {/* Messages list */}
            <ul className="[&>li:nth-child(odd)]:bg-gray-300">
              {messages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
            <form className="flex">
              {/* Input for new message */}
              <input
                id="messageInput"
                type="text"
                autoComplete="off"
                className="w-1/5 border-2 border-pink-700"
                placeholder="Enter your message here"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              {/* Send msg btn */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  sendMsg();
                }}
                className="hover:scale-105 active:scale-95 cursor-pointer bg-teal-500 px-2 rounded-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Messages;
