import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
// Importing socket.io client
import { io } from "socket.io-client";
import { Send, MessageCircle } from "lucide-react";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div className="flex flex-row justify-center items-center gap-2 text-teal-600">
            <MessageCircle size={30} />
            <h1 className="text-center font-bold text-3xl">Messages</h1>
          </div>
          <div className="rounded-2xl shadow-md p-8 border-gray-200">
            {/* Messages list */}
            <ul className="flex flex-col items-center p-2 mb-2 [&>li:nth-child(odd)]:bg-gray-100">
              {messages.map((msg, index) => (
                <li
                  className="bg-gray-50 border border-neutral-100 p-3 mb-8 w-3/4 rounded-2xl rounded-tl-none shadow-md"
                  key={index}
                >
                  {msg}
                </li>
              ))}
            </ul>

            <form className="flex gap-3">
              {/* Input for new message */}
              <input
                id="messageInput"
                type="text"
                autoComplete="off"
                className="w-full bg-gray-100 px-4 rounded-full ring-1 ring-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
                placeholder="Enter your message here"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              {/* Send msg btn */}
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  sendMsg();
                }}
                className="flex items-center justify-center p-3 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer bg-teal-500 rounded-full transition-all"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Messages;
