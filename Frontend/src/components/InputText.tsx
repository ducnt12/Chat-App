import { ChangeEvent, FC, useState } from "react";

type SendMesageFunc = (msg: string) => void;

interface SendMessage {
  sendMsg: SendMesageFunc; //func
}

const InputText: FC<SendMessage> = ({ sendMsg }) => {
  const [msg, setMsg] = useState<string>("");

  return (
    <div className="inputtext_container">
      <textarea
        name="message"
        id="message"
        placeholder="Input message here..."
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setMsg(e.target.value)
        }
        value={msg}
      ></textarea>
      <button
        onClick={(): void => {
          sendMsg(msg);
          setMsg("");
        }}
      >
        Send
      </button>
    </div>
  );
};

export default InputText;
