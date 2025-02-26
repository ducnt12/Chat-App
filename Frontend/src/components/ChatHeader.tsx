import { FaYoutube } from "react-icons/fa6";
import User from "../class/user";
import { StateAction } from "../class/StateAction";

interface UserInfo extends StateAction<User> {
  user: User;
}

const ChatHeader: React.FC<UserInfo> = ({ user, set }) => {
  return (
    <div className="chats_header">
      <h4>Username: {user.username}</h4>
      <p>
        <FaYoutube className="chats_icon" />
        Code with Duc
      </p>
      <p className="chats_logout">
        <strong onClick={() => set({ ...user, username: null })}>Logout</strong>
      </p>
    </div>
  );
};

export default ChatHeader;
