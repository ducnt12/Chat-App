import ChatBox from "./ChatBox";
import type { Chat, User } from "../class/interfaces";

interface ChatListProps {
  chats: Chat[];
  loggedUser: User;
}

const ChatList = ({ chats, loggedUser }: ChatListProps) => {
  return (
    <section
      className="chat_list"
      role="log"
      aria-label="Conversation"
      aria-live="polite"
      aria-relevant="additions"
    >
      {chats.length === 0 ? (
        <div className="chat_empty">
          <span className="brand_mark brand_mark_empty" aria-hidden="true">
            <span>•••</span>
          </span>
          <h2>No messages yet</h2>
          <p>Start the conversation when you’re ready.</p>
        </div>
      ) : (
        chats.map((chat) => (
          <ChatBox
            key={chat._id}
            msg={chat.msg}
            sender={chat.sender}
            isSender={chat.sender.username === loggedUser.username}
          />
        ))
      )}
    </section>
  );
};

export default ChatList;
