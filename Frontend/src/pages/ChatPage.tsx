import { FC, useEffect, useRef, useState } from "react";

import ChatList from "../components/ChatList";
import InputText from "../components/InputText";
import ChatHeader from "../components/ChatHeader";
import LoginPage from "./LoginPage";
import { serverUrl } from "../assets/data";
import { Chat, User } from "../class/interfaces";
import io from "socket.io-client";

const ChatPage: FC = () => {
  const [user, setUser] = useState<User>({ username: null });
  const socketRef = useRef<SocketIOClient.Socket | null>(io(serverUrl));
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    socketRef.current?.on("chat", (chats: Chat[]) => {
      setChats(chats);
    });
  }, [chats]);

  const sendMsg = (msg: string): void => {
    setChats([...chats, { msg: msg, sender: { ...user } }]);
    socketRef.current?.emit("chat", [
      ...chats,
      { msg: msg, sender: { ...user } },
    ]);
  };

  return (
    <div>
      {user.username ? (
        <div>
          <ChatHeader username={user.username} set={setUser} />
          <ChatList chats={chats} loggedUser={user} />
          <InputText sendMsg={sendMsg} />
        </div>
      ) : (
        <LoginPage set={setUser} />
      )}
    </div>
  );
};

export default ChatPage;
