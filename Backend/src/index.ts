import express, { Request, Response } from "express";
import cors from "cors";
import { corsOptions } from "./settings/CorsOptions";
import http from "http";
import { Server } from "socket.io";
import { Chat } from "./class/interfaces";
import { log } from "console";

const app = express();
const server = http.createServer(app);
const port: number = 3001;

app.use(cors(corsOptions)); // Apply CORS to Express routes

const io = new Server(server, {
  cors: corsOptions, // Apply CORS to Socket.IO
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat", (chats: Chat[]) => {
    io.emit("chat", chats);
    console.log(`A message sent ${chats.at(-1)?.msg}`);
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
