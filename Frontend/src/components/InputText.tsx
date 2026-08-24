import { FaPaperPlane } from "react-icons/fa6";
import { memo, useState, type FormEvent } from "react";

interface InputTextProps {
  onSend: (message: string) => void;
}

const InputText = memo(({ onSend }: InputTextProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    onSend(trimmedMessage);
    setMessage("");
  };

  return (
    <form
      className="inputtext_container"
      onSubmit={handleSubmit}
      aria-label="Message composer"
    >
      <div className="composer_field">
        <label className="visually_hidden" htmlFor="message">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={1}
          placeholder="Write a message…"
          autoComplete="off"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
      </div>
      <button className="send_button" type="submit">
        <span>Send</span>
        <FaPaperPlane aria-hidden="true" />
      </button>
    </form>
  );
});

InputText.displayName = "InputText";

export default InputText;
