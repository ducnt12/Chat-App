import { useState } from "react";

import ChatList from "../components/ChatList";
import InputText from "../components/InputText";
import ChatHeader from "../components/ChatHeader";
import LoginPage from "./LoginPage";
import User from "../class/user";

const ChatPage: React.FC = () => {
  const [user, setUser] = useState<User>({ username: null });
  return (
    <div>
      {user.username ? (
        <div>
          <ChatHeader user={user} set={setUser} />
          <ChatList />
          <InputText />
        </div>
      ) : (
        <LoginPage set={setUser} />
      )}
    </div>
  );
};

export default ChatPage;
