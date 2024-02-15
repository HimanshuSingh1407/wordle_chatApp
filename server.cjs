const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Handle incoming connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle message events
  socket.on("newtext", (msg) => {
    console.log("Received message:", msg);
    // Broadcast the message to all connected clients
    io.emit("newtext", msg);
  });

  // ... other event handlers ...

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
http.listen(8080, () => {
  console.log("Server listening on port 8080");
});
