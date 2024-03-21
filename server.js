const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

dbConnection();

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT} `);
});

const io = socket(server, {
  cors: {
    origin: " http://localhost:5173",
    Credential: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
