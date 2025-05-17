import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
  },
});

// export const getSocketRecieverId = (userId) => {
//   return userConnectionMap[userId]
// }

// const userConnectionMap = {};

io.on("connection", (socket) => {
  // console.log("A user Connected", socket.id);

  // const userId = socket.handshake.query.userId;
  // if (userId) userConnectionMap[userId] = socket.id;

  // console.log(userConnectionMap);
  // io.emit("getOnlineUsers", Object.keys(userConnectionMap));
  socket.on("new_booking", (data) => {
    io.emit("notify_booking", data);
    // console.log("A User DisConnect", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export { server, app, io };
