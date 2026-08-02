import express, { Request, Response } from "express";
import { corsOptions } from "./settings/CorsOptions";
import http from "http";
import { Server } from "socket.io";
import { Chat, findAllChats, saveChat } from "./models/Chat";
import connectDB from "./db";
import cors from "cors";

// Initilize Express App
const app = express();
app.use(cors(corsOptions));

// Connect MongoDB
connectDB();

// Create server
const server = http.createServer(app);
const port: number = Number.parseInt(process.env.PORT ?? "3002", 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

const io = new Server(server, {
  cors: corsOptions, // Apply CORS to Socket.IO
});

io.on("connection", async (socket) => {
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  //Load message from db and send to chat
  try {
    const chats: Chat[] = await findAllChats();
    io.emit("initChatView", chats);
  } catch (error) {
    console.log(error);
  }

  //subcribe to newMessage channel -> save new message to db then send it back to message channel.
  socket.on("newMessage", async (chat: Chat) => {
    const newChat: Chat = await saveChat(chat);
    io.emit("messageView", newChat);
    console.log(
      `A new message saved: ${chat.msg} from ${chat.sender.username}`
    );
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
