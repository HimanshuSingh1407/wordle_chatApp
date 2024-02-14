import { useState } from "react";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm); // Invert the state on each click
  };

  return (
    <>
      <div>
        <h1>Chat App</h1>
        <button onClick={toggleForm}>
          {showForm ? "Hide Form" : "Start Chat"}
        </button>
        {showForm && (
          <div >
            <form id="form">
              <input id="inputText" type="text" autoComplete="off" />
              <input type="submit" value="Send" />
            </form>
            <div id="msgs"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
