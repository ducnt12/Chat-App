import { FC } from "react";
import { Chat } from "../class/interfaces";

interface ChatBoxProps<T> extends Chat {
  mode?: T;
}

export enum Mode {
  Sender,
  Receiver,
}

const ChatBox: FC<ChatBoxProps<Mode>> = ({ msg, sender, mode }) => {
  return (
    <div className={mode === Mode.Sender ? "chat_sender" : "chat_receiver"}>
      {mode === Mode.Receiver ? <img src={sender.avatar} alt="" /> : <></>}
      <p>
        <strong>{sender.username}</strong>
        <br />
        {msg}
        <br />
      </p>
      {mode === Mode.Sender ? <img src={sender.avatar} alt="" /> : <></>}
    </div>
  );
};

export default ChatBox;
