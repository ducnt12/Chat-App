import { memo } from "react";
import type { Chat } from "../class/interfaces";

interface ChatBoxProps extends Pick<Chat, "msg" | "sender"> {
  isSender: boolean;
}

const ChatBox = memo(({ msg, sender, isSender }: ChatBoxProps) => {
  return (
    <article
      className={`chat_message ${
        isSender ? "chat_sender" : "chat_receiver"
      }`}
    >
      {!isSender ? (
        <img
          className="chat_avatar"
          src={sender.avatar}
          alt=""
          width="30"
          height="30"
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <div className="chat_bubble">
        <strong className="chat_author">{sender.username}</strong>
        <p className="chat_text">{msg}</p>
      </div>
      {isSender ? (
        <img
          className="chat_avatar"
          src={sender.avatar}
          alt=""
          width="30"
          height="30"
          loading="lazy"
          decoding="async"
        />
      ) : null}
    </article>
  );
});

ChatBox.displayName = "ChatBox";

export default ChatBox;
