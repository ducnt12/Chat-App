import { FC } from "react";
import ChatBox, { Mode } from "./ChatBox";
import { Chat, User } from "../class/interfaces";

interface ChatListProps {
  chats: Chat[];
  loggedUser: User;
}

const ChatList: FC<ChatListProps> = ({ chats, loggedUser }) => {
  return (
    <div className="chat_list">
      {chats.map((chat) => {
        if (chat.sender.username === loggedUser.username) {
          return (
            <ChatBox msg={chat.msg} sender={chat.sender} mode={Mode.Sender} />
          );
        } else {
          return (
            <ChatBox msg={chat.msg} sender={chat.sender} mode={Mode.Receiver} />
          );
        }
      })}
    </div>
  );
};

export default ChatList;
