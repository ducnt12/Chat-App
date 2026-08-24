import { FaCommentDots, FaRightFromBracket } from "react-icons/fa6";
import { memo } from "react";
import type { User } from "../class/interfaces";

interface ChatHeaderProps {
  user: User;
  onLogout: () => void;
}

const ChatHeader = memo(({ user, onLogout }: ChatHeaderProps) => {
  return (
    <header className="chats_header">
      <div className="chat_brand" translate="no">
        <span className="brand_mark brand_mark_small" aria-hidden="true">
          <FaCommentDots />
        </span>
        <div className="chat_brand_copy">
          <h1>Chat App</h1>
          <p>Public conversation</p>
        </div>
      </div>

      <div className="chat_account">
        <img
          className="account_avatar"
          src={user.avatar}
          alt=""
          width="42"
          height="42"
          decoding="async"
        />
        <div className="account_copy">
          <span>Signed in as</span>
          <strong>{user.username}</strong>
        </div>
        <button
          className="chats_logout_button"
          type="button"
          onClick={onLogout}
          aria-label="Log Out"
        >
          <span>Log Out</span>
          <FaRightFromBracket aria-hidden="true" />
        </button>
      </div>
    </header>
  );
});

ChatHeader.displayName = "ChatHeader";

export default ChatHeader;
