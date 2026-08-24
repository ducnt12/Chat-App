import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

import ChatList from "../components/ChatList";
import InputText from "../components/InputText";
import ChatHeader from "../components/ChatHeader";
import LoginPage from "./LoginPage";
import { serverUrl } from "../assets/data";
import type {
  Chat,
  ClientToServerEvents,
  ServerToClientEvents,
  User,
} from "../class/interfaces";

type ChatSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const ChatPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const socketRef = useRef<ChatSocket | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const socket: ChatSocket = io(serverUrl, { autoConnect: false });
    const handleInitialChats = (initialChats: Chat[]) => {
      setChats(initialChats);
    };
    const handleMessage = (chat: Chat) => {
      setChats((previousChats) => [...previousChats, chat]);
    };

    socketRef.current = socket;
    socket.on("initChatView", handleInitialChats);
    socket.on("messageView", handleMessage);
    socket.connect();

    return () => {
      socket.off("initChatView", handleInitialChats);
      socket.off("messageView", handleMessage);
      socket.disconnect();

      if (socketRef.current === socket) {
        socketRef.current = null;
      }
    };
  }, [user]);

  const handleLogin = useCallback((loggedInUser: User) => {
    setChats([]);
    setUser(loggedInUser);
  }, []);

  const handleLogout = useCallback(() => {
    setChats([]);
    setUser(null);
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      const trimmedMessage = message.trim();

      if (!user || !trimmedMessage) {
        return;
      }

      socketRef.current?.emit("newMessage", {
        msg: trimmedMessage,
        sender: user,
      });
    },
    [user]
  );

  return (
    <main className={user ? "chat_page" : "login_page"}>
      {user ? (
        <section className="chat_shell" aria-label="Chat App">
          <ChatHeader user={user} onLogout={handleLogout} />
          <ChatList chats={chats} loggedUser={user} />
          <InputText onSend={sendMessage} />
        </section>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </main>
  );
};

export default ChatPage;
