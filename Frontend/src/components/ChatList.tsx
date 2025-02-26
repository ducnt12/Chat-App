const ChatList: React.FC = () => {
  const SenderChat: React.FC = () => {
    return (
      <div className="chat_sender">
        <img src="https://picsum.photos/id/237/200/300" alt="" />
        <p>
          <strong>das</strong>
          <br />
          asda
        </p>
      </div>
    );
  };

  const ReceiverChat: React.FC = () => {
    return (
      <div className="chat_receiver">
        <img src="https://picsum.photos/id/237/200/300" alt="" />
        <p>
          <strong>hello</strong>
          <br />
          asda
        </p>
      </div>
    );
  };

  return (
    <div>
      <SenderChat />
      <ReceiverChat />
    </div>
  );
};

export default ChatList;
