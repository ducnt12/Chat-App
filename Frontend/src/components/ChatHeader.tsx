import { FaYoutube } from "react-icons/fa6";
import { FC } from "react";
import { StateAction, User } from "../class/interfaces";

interface ChatHeaderProps extends StateAction<User>, User {}

const ChatHeader: FC<ChatHeaderProps> = ({ username, set }) => {
  return (
    <div className="chats_header">
      <h4>Username: {username}</h4>
      <p>
        <FaYoutube className="chats_icon" />
        Code with Duc
      </p>
      <p className="chats_logout">
        <strong onClick={() => set({ username: null })}>Logout</strong>
      </p>
    </div>
  );
};

export default ChatHeader;
