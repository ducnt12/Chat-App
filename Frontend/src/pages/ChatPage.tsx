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
  const socketRef = useRef<SocketIOClient.Socket | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  // const [newMsgSent, setNewMsgSent] = useState<number>(0);

  useEffect(() => {
    socketRef.current = io(serverUrl);
    socketRef.current?.on("initChatView", (chats: Chat[]) => {
      setChats(chats);
    });

    // subcribe to message channel -> update chat state
    socketRef.current?.on("messageView", (chat: Chat) => {
      setChats((prevChats) => [...prevChats, chat]);
    });
    // unsubcribe from message and chat channel
    return () => {
      socketRef.current?.off("initChatView");
      socketRef.current?.off("messageView");
    };
  }, []);

  const sendMsg = (msg: string): void => {
    socketRef.current?.emit("newMessage", { msg: msg, sender: { ...user } });
    // setNewMsgSent(newMsgSent === 0 ? 1 : 0);
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
