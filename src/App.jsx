import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const newSocket = io("https://worldle-backend.onrender.com");
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  const handleChange = (e) => {
    console.log("event", e.target.value);
    setMessage(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (socket && message.trim() !== "") {
      socket.emit("newtext", message.trim());
    }
    setMessage("");
  };

  useEffect(() => {
    if (socket) {
      socket.on("newtext", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
      socket.on("history", (history) => {
        setMessages(history);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("newuser", () => {
        console.log("new User");
      });
    }
  }, [socket]);

  return (
    <>
      <div className="container">
        <h1 className="title">Chat App</h1>
        <button className="toggle-btn" onClick={toggleForm}>
          {showForm ? "Hide Form" : "Start Chat"}
        </button>
        {showForm && (
          <div className="chat-container">
            <form id="form" onSubmit={handleSubmit}>
              <input
                className="message-input"
                type="text"
                autoComplete="off"
                value={message}
                onChange={handleChange}
                placeholder="Type your message here..."
              />
              <button className="send-btn" type="submit">
                Send
              </button>
            </form>
            <div className="message-container" >
              {messages?.map((message, index) => (
                <div key={index} className={`message ${index % 2 === 0 ? 'left' : 'right'}`}>
                  <p>{message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
