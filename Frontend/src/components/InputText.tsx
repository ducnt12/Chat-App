import { ReactElement } from "react";

const InputText = (): ReactElement => {
  return (
    <div className="inputtext_container">
      <textarea
        name="message"
        id="message"
        placeholder="Input message here..."
      ></textarea>
      <button>Send</button>
    </div>
  );
};

export default InputText;
